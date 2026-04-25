import React from "react";
import styles from "../../styles/cartsummary.module.css";

function CartSummary({ total }) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(total);

  return (
    <div className={styles.box}>
      <h3>PRICE DETAILS</h3>

      <div className={styles.row}>
        <span>Total Amount</span>
        <span>{formatted}</span>
      </div>
    </div>
  );
}

export default CartSummary;