import React from "react";
import styles from "../../styles/button/cartbutton.module.css";

function Cartbutton({ product }) {

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    const cartKey = `cart_${token}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      cart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert("Added to cart ✅");
  };

  return (
    <button className={styles.cartBtn} onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}

export default Cartbutton;