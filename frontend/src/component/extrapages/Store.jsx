import React, { useEffect, useState } from "react";
import styles from "../../styles/store.module.css";
import Storeproduct from "../productcard/Storeproduct";
import Useraddress from "../address/Useraddress";

function Store() {
  const [apiProducts, setApiProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const email = localStorage.getItem("email");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {}
    );
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const apiRes = await fetch("https://dummyjson.com/products?limit=12");
        const apiData = await apiRes.json();
        setApiProducts(apiData.products || []);

        const dbRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/all?email=${email}`
        );
        const dbData = await dbRes.json();

        setDbProducts(dbData || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAll();
  }, [email]);

  const getStoreName = (url) => {
    try {
      if (!url) return "Store";
      const part = url.split("/place/")[1];
      return decodeURIComponent(part.split("/")[0]).replace(/\+/g, " ");
    } catch {
      return "Store";
    }
  };

  const getDistance = () => {
    if (!userLocation) return "2.0 km";
    return "Nearby";
  };

  const getRating = () =>
    (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  const filteredDb = dbProducts.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredApi = apiProducts.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Useraddress />

      <div className={styles.container}>
        <h2 className={styles.heading}>Store Products</h2>

        <input
          className={styles.search}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.grid}>
          {filteredDb.map((item, index) => (
            <Storeproduct
              key={index}
              product={{
                image: item.image,
                title: item.name,
                price: item.price,
                location: getStoreName(item.mapLink),
                rating: getRating(),
                distance: getDistance(),
                onViewStore: () => {
                  if (!item.mapLink) {
                    alert("Map link missing");
                    return;
                  }

                  let url = item.mapLink.trim();
                  if (!url.startsWith("http")) {
                    url = "https://" + url;
                  }

                  window.open(url, "_blank");
                },
              }}
            />
          ))}

          {filteredApi.map((item) => (
            <Storeproduct
              key={item.id}
              product={{
                image: item.thumbnail,
                title: item.title,
                price: Math.round(item.price * 84),
                location: item.brand || "Store",
                rating: item.rating || getRating(),
                distance: "Nearby",
                onViewStore: () => {
                  window.open("https://www.google.com/maps", "_blank");
                },
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Store;