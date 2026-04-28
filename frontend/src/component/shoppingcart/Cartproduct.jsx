import React, { useEffect, useState } from "react";
import styles from "../../styles/cartproduct.module.css";

function Cartproduct({ setTotal }) {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
    calculateTotal(data);
  };

  useEffect(() => {
    loadCart();

    const handleUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
    };
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(total);
  };

  const updateQuantity = (productId, type) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map((item) => {
      if (item.id === productId) {
        if (type === "inc") item.quantity += 1;
        if (type === "dec") item.quantity -= 1;
      }
      return item;
    });

    cart = cart.filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
    calculateTotal(cart);
  };

  if (cart.length === 0) {
    return <div className={styles.empty}>Your cart is empty 🛒</div>;
  }

  return (
    <div className={styles.wrapper}>
      {cart.map((item) => (
        <div key={item.id} className={styles.card}>
          <img src={item.image} alt={item.title} className={styles.image} />

          <div className={styles.details}>
            <h3>{item.title}</h3>
            <p>₹ {item.price}</p>
          </div>

          <div className={styles.actions}>
            <button onClick={() => updateQuantity(item.id, "dec")}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cartproduct;