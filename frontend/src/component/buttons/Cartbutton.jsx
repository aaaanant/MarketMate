import React from "react";
import styles from "../../styles/button/cartbutton.module.css";

function Cartbutton({ product, text = "Add to Cart" }) {

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const cartId = localStorage.getItem("cartId");

    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    const cartKey = "cart";
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

    if (cartId) {
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
      } catch (err) {
        console.log(err);
      }
    }

    window.location.reload();
  };

  return (
    <button className={styles.cartBtn} onClick={handleAddToCart}>
      {text}
    </button>
  );
}

export default Cartbutton;