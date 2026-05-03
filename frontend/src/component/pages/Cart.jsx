import React, { useState, useEffect } from "react";
import styles from "../../styles/cartpage.module.css";

import Friendinvite from "../shoppingcart/Friendinvite";
import Cartproduct from "../shoppingcart/Cartproduct";
import CartSummary from "../shoppingcart/Cartsummary";
import SuggestionProduct from "../extrapages/SuggestionProduct";

function Cart() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      alert("Please login");
      return;
    }

    const fetchTotal = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/price/${email}`
        );

        const data = await res.json();
        setTotal(data.total || 0);

      } catch (err) {
        console.log(err);
      }
    };

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/user/${email}`
        );

        const data = await res.json();

        if (data && data._id) {
          localStorage.setItem("cartId", data._id);
        } else {
          const res2 = await fetch(
            `${import.meta.env.VITE_API_URL}/api/cart/create`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }
          );

          const newCart = await res2.json();
          localStorage.setItem("cartId", newCart._id);
        }

        await fetchTotal(); // 🔥 important

        setLoading(false);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchCart();
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

      <SuggestionProduct />
    </div>
  );
}

export default Cart;