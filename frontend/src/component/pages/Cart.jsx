import React, { useState, useEffect } from "react";
import styles from "../../styles/cartpage.module.css";

import Friendinvite from "../shoppingcart/Friendinvite";
import Cartproduct from "../shoppingcart/Cartproduct";
import CartSummary from "../shoppingcart/Cartsummary";

function Cart() {
  const [total, setTotal] = useState(0);

  // 🔥 CREATE CART (IMPORTANT)
  useEffect(() => {
    const createCart = async () => {
      const email = localStorage.getItem("email");

      if (!email) return;

      // agar already cart hai toh skip
      if (localStorage.getItem("cartId")) return;

      try {
        const res = await fetch("http://localhost:5000/api/cart/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        localStorage.setItem("cartId", data._id);
        console.log("Cart Created:", data);

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