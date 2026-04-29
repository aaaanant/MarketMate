import React from "react";
import styles from "../../styles/button/cartbutton.module.css";

function Cartbutton({ product, text = "Add to Cart" }) {
  const handleAddToCart = async () => {
    try {
      const cartId = localStorage.getItem("cartId");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId,
            product: {
              id: product._id,
              title: product.title,
              price: product.price,
              image: product.image,
            },
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      alert("Added to cart");
      window.dispatchEvent(new Event("cartUpdated"));

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