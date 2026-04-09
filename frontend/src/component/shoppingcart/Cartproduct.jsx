import React, { useEffect, useState } from "react";
import styles from "../../styles/cartproduct.module.css";

function Cartproduct({ setTotal }) {
  const [cartItems, setCartItems] = useState([]);

  // 🔥 Load cart on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(data);
    calculateTotal(data);
  }, []);

  // 🔥 Calculate total
  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(total);
  };

  // 🔥 Update cart
  const updateCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    calculateTotal(updated);
  };

  // ➕ Increase
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  // ➖ Decrease
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

  // ❌ Remove
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    updateCart(updated);
  };

  return (
    <div className={styles.container}>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className={styles.card}>
            
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className={styles.image}
            />

            {/* Info */}
            <div className={styles.info}>
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>

              {/* Quantity */}
              <div className={styles.qty}>
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>

              {/* Remove */}
              <button
                className={styles.removeBtn}
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cartproduct;