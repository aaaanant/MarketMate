import React from "react";
import styles from "../../styles/button/buynow.module.css";

function Buynow() {

  const handleBuyNow = () => {
    window.open("https://razorpay.me/@anantbhatt593", "_blank");
  };

  return (
    <button className={styles.buyBtn} onClick={handleBuyNow}>
      Buy Now
    </button>
  );
}

export default Buynow;