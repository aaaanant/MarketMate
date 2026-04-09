import React, { useEffect, useState } from "react";
import styles from "../../styles/trendingproduct.module.css";

function Trendingproduct() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const getProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      console.log(data);

      const shuffled = [...data].sort(() => 0.5 - Math.random());
      const randomProducts = shuffled.slice(0, 5);

      setProducts(randomProducts);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  getProducts();
}, []);

  return (
    <div className={styles.container}>

      <h2 className={styles.heading}>🔥 Trending Products</h2>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.cardContainer}>
          {products.map((item) => (
            <div key={item._id} className={styles.card}>
              
              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              <p>₹ {Math.round(item.price * 80)}</p>

              <div className={styles.btnGroup}>
                <button className={styles.viewBtn}>View Store</button>
                <button className={styles.cartBtn}>Add to Cart</button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Trendingproduct;