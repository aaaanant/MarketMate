import React, { useEffect, useState } from "react";
import styles from "../../styles/nearbyStore.module.css";

import AddToCartButton from "../extrapages/Cartbutton";
import ViewStoreButton from "../extrapages/Viewstorebutton";

const NearbyStore = () => {

  const [products, setProducts] = useState([]);

  // 🔥 Dummy API fetch
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>

      <h2 className={styles.heading}>Nearby Stores 🏪</h2>

      <div className={styles.grid}>

        {products.map((item) => (
          <div key={item.id} className={styles.card}>

            <img src={item.image} alt={item.title} />

            <h3>{item.title.slice(0, 40)}...</h3>

            <p className={styles.price}>₹ {item.price}</p>

            <div className={styles.buttons}>
              <ViewStoreButton onClick={() => alert("View Store")} />
              <AddToCartButton onClick={() => alert("Added to cart")} />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default NearbyStore;