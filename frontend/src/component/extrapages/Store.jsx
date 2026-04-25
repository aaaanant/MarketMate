import React, { useEffect, useState } from "react";
import styles from "../../styles/store.module.css";
import Storeproduct from "../productcard/Storeproduct";
import Useraddress from "../address/Useraddress";

function Store() {
  const [apiProducts, setApiProducts] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => setApiProducts(data.products));

    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setLocalProducts(saved);
  }, []);

  const getStoreName = (url) => {
    try {
      const part = url.split("/place/")[1];
      return part ? part.split("/")[0].replace(/\+/g, " ") : "Store";
    } catch {
      return "Store";
    }
  };

  const getRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const getDistance = () =>
    (Math.random() * (3 - 0.5) + 0.5).toFixed(1) + " km";

  const filteredLocal = localProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredApi = apiProducts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
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
          {filteredLocal.map((item, index) => (
            <Storeproduct
              key={`local-${index}`}
              product={{
                image: "https://via.placeholder.com/150",
                title: item.name,
                price: item.price,
                location: getStoreName(item.mapLink),
                rating: getRating(),
                distance: getDistance(),
                onViewStore: () => window.open(item.mapLink, "_blank"),
              }}
            />
          ))}

          {filteredApi.map((item) => (
            <Storeproduct
              key={`api-${item.id}`}
              product={{
                image: item.thumbnail,
                title: item.title,
                price: Math.round(item.price * 84),
                location: item.brand || "Store",
                rating: item.rating || getRating(),
                distance: getDistance(),
                onViewStore: () =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${item.title}`,
                    "_blank"
                  ),
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Store;