import React, { useState } from "react";
import styles from "../../styles/cartpage.module.css";

import Friendinvite from "../shoppingcart/Friendinvite";
import Cartproduct from "../shoppingcart/Cartproduct";
import CartSummary from "../shoppingcart/Cartsummary";

function Cart() {
  const [total, setTotal] = useState(0);

  return (
    <div className={styles.container}>

      {/* 🔥 TOP ROW */}
      <div className={styles.topRow}>
        
        <div className={styles.invite}>
          <Friendinvite />
        </div>

        <div className={styles.summary}>
          <CartSummary total={total} />
        </div>

      </div>

      {/* 🔥 BOTTOM */}
      <div className={styles.bottomRow}>
        <Cartproduct setTotal={setTotal} />
      </div>

    </div>
  );
}

export default Cart;