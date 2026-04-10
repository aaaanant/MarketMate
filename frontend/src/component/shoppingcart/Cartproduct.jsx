import React, { useEffect, useState } from "react";
import styles from "../../styles/cartproduct.module.css";

function Cartproduct({ setTotal }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(data);
    calculateTotal(data);
  }, []);

  // 🔥 TOTAL CALCULATION (FIXED)
  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // ✔ fix floating issue
    setTotal(parseFloat(total.toFixed(2)));
  };

  const updateCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    calculateTotal(updated);
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    updateCart(updated);
  };

  // 🔥 EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products to start shopping</p>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item._id} className={styles.card}>
          
          <img src={item.image} alt={item.name} className={styles.image} />

          <div className={styles.info}>
            <h3>{item.name}</h3>

            {/* 🔥 PRICE FIX DISPLAY */}
            <p>₹ {item.price.toFixed(2)}</p>

            <div className={styles.qty}>
              <button onClick={() => decreaseQty(item._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item._id)}>+</button>
            </div>

            <button
              className={styles.removeBtn}
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cartproduct;