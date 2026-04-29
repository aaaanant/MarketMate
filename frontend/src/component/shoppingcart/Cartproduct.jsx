import React, { useEffect, useState } from "react";
import styles from "../../styles/cartproduct.module.css";

function Cartproduct({ setTotal }) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const email = localStorage.getItem("email");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/user/${email}`
      );

      const data = await res.json();

      if (data && data.items) {
        setCart(data.items);
        calculateTotal(data.items);
      } else {
        setCart([]);
      }

    } catch (err) {
      console.log(err);
    }
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

  const updateQuantity = async (productId, type) => {
    const email = localStorage.getItem("email");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/cart/user/${email}`
    );
    const cartData = await res.json();

    let item = cartData.items.find((i) => i.id === productId);
    if (!item) return;

    let newQty = item.quantity;
    if (type === "inc") newQty++;
    if (type === "dec") newQty--;

    if (newQty <= 0) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartData._id,
          productId,
        }),
      });
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartData._id,
          productId,
          quantity: newQty,
        }),
      });
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (cart.length === 0) {
    return <div className={styles.empty}>Your cart is empty 🛒</div>;
  }

  return (
    <div className={styles.wrapper}>
      {cart.map((item) => (
        <div key={item.id} className={styles.card}>
          <img
            src={item.image}
            alt={item.title}
            className={styles.image}
          />

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