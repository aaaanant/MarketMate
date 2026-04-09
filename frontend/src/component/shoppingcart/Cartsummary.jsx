import React from "react";
import styles from "../../styles/cartsummary.module.css";

function CartSummary({ total }) {
  return (
    <div className={styles.container}>
      <h2>Total Bill</h2>
      <p>₹ {total}</p>
    </div>
  );
}

export default CartSummary;