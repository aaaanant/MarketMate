import React, { useEffect, useState } from "react";
import styles from "../../styles/trendingproduct.module.css";

function Trendingproduct() {
  const [products, setProducts] = useState([]);

 useEffect(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {

      // 🔥 RANDOM 5 PRODUCTS
      const shuffled = data.sort(() => 0.5 - Math.random());
      const randomProducts = shuffled.slice(0, 5);

      const formatted = randomProducts.map((item) => ({
        _id: item.id,
        name: item.title,
        price: item.price,
        image: item.image
      }));

      setProducts(formatted);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <div className={styles.container}>
      
      <h2 className={styles.heading}>🔥 Trending Products</h2>

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

    </div>
  );
}

export default Trendingproduct;