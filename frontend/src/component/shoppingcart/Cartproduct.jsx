import React, { useEffect, useState } from "react";
import styles from "../../styles/cartproduct.module.css";

function Cartproduct({ setTotal }) {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartId}`
      );
      const data = await res.json();

      setCartItems(data.items || []);
      calculateTotal(data.items || []);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(parseFloat(total.toFixed(2)));
  };

  const updateQuantity = async (productId, quantity) => {
    const cartId = localStorage.getItem("cartId");

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId,
            productId,
            quantity,
          }),
        }
      );

      fetchCart(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (productId) => {
    const cartId = localStorage.getItem("cartId");

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/remove`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId,
            productId,
          }),
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty 🛒</h2>
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
            <p>₹ {item.price}</p>

            <div className={styles.qty}>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
              >
                +
              </button>
            </div>

            <button
              className={styles.removeBtn}
              onClick={() => removeItem(item.productId)}
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