import React from "react";
import styles from "../../styles/productcard/productcard.module.css";

function Productcard({ product, children }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>

      <p>₹ {product.price}</p>

      <div className={styles.btnGroup}>
        {children}
      </div>
    </div>
  );
}

export default Productcard;