import React, { useEffect, useState } from "react";
import styles from "../../styles/store.module.css";
import Storeproduct from "../productcard/Storeproduct";
import Useraddress from "../address/Useraddress";

function Store() {
  const [apiProducts, setApiProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const apiRes = await fetch("https://dummyjson.com/products?limit=12");
        const apiData = await apiRes.json();
        setApiProducts(apiData.products || []);

        const dbRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/all`
        );
        const dbData = await dbRes.json();
        setDbProducts(dbData || []);

        const storeRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/store/all`
        );
        const storeData = await storeRes.json();
        setStores(storeData || []);

      } catch (err) {
        console.log(err);
      }
    };

    fetchAll();
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
              key={`db-${index}`}
              product={{
                image: item.image || "https://via.placeholder.com/150",
                title: item.name,
                price: item.price,
                location: "Your Store",
                rating: getRating(),
                distance: getDistance(),
                source: "Your Product",
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
                source: "API Product",
              }}
            />
          ))}
        </div>

        {stores.length > 0 && (
          <>
            <h2 className={styles.heading}>Nearby Stores</h2>
            <div className={styles.grid}>
              {stores.map((store) => (
                <div key={store._id} className={styles.card}>
                  <h3>{store.name}</h3>
                  <p>{store.address}</p>
                  <p>{store.category}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Store;