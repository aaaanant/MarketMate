import React, { useEffect, useState } from "react";
import styles from "../../styles/cartproduct.module.css";

function Cartproduct({ setTotal }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
    calculateTotal(data);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(total);
  };

  const updateQuantity = (id, type) => {
    let updatedCart = [];

    if (type === "inc") {
      updatedCart = cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else if (type === "dec") {
      updatedCart = cart
        .map((item) => {
          if (item.id === id) {
            if (item.quantity === 1) return null;
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(Boolean);
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
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
            <span className={styles.added}>Added by You</span>
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