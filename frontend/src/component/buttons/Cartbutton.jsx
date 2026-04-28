import React from "react";
import styles from "../../styles/button/cartbutton.module.css";

function Cartbutton({ product, text = "Add" }) {
  const handleAddToCart = async () => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      alert("Cart not found");
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          product,
        }),
      });

      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className={styles.cartBtn} onClick={handleAddToCart}>
      {text}
    </button>
  );
}

export default Cartbutton;