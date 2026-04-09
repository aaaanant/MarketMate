import React from "react";
import styles from "../../styles/cartbutton.module.css";

const AddToCartButton = ({ product }) => {

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      cart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart ✅");
  };

  return (
    <button className={styles.cartBtn} onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;