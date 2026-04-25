import React, { useState, useEffect } from "react";
import styles from "../../styles/cartpage.module.css";

import Friendinvite from "../shoppingcart/Friendinvite";
import Cartproduct from "../shoppingcart/Cartproduct";
import CartSummary from "../shoppingcart/Cartsummary";

function Cart() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to access your cart");
      return;
    }

    const createCart = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;

      let cartId = localStorage.getItem("cartId");
      if (cartId) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await res.json();
        localStorage.setItem("cartId", data._id);
      } catch (err) {
        console.log("Error creating cart:", err);
      }
    };

    createCart();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.invite}>
          <Friendinvite />
        </div>

        <div className={styles.summary}>
          <CartSummary total={total} />
          <button className={styles.orderBtn}>PLACE ORDER</button>
        </div>
      </div>

      <div className={styles.products}>
        <Cartproduct setTotal={setTotal} />
      </div>
    </div>
  );
}

export default Cart;