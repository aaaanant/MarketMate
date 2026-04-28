import React, { useEffect, useState } from "react";
import styles from "../../styles/cartproduct.module.css";

function Cartproduct({ setTotal }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartId}`
      );
      const data = await res.json();

      if (data.items) {
        setCart(data.items);
        calculateTotal(data.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(total);
  };

  const updateQuantity = async (id, type) => {
    const cartId = localStorage.getItem("cartId");

    const item = cart.find((i) => i.id === id);
    if (!item) return;

    let newQty = item.quantity;

    if (type === "inc") newQty++;
    else if (type === "dec") newQty--;

    if (newQty <= 0) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, productId: id }),
      });
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          productId: id,
          quantity: newQty,
        }),
      });
    }

    fetchCart();
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