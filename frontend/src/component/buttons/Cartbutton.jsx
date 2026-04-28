import React from "react";
import styles from "../../styles/button/cartbutton.module.css";

function Cartbutton({ product, text = "Add to Cart" }) {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productId = String(product._id || product.id);

    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: productId,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
      alert("Added to cart");
  };

  return (
    <button className={styles.cartBtn} onClick={handleAddToCart}>
      {text}
    </button>
  );
}

export default Cartbutton;