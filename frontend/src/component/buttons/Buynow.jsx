import React from "react";
import styles from "../../styles/button/buynow.module.css";

function Buynow({ product }) {

  const handlePayment = () => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: product.price * 100,
      currency: "INR",
      name: "MarketMate",
      description: product.name,

      handler: function (response) {
        alert("Payment Successful ✅");
        console.log(response);
      },

      prefill: {
        name: "Anant Bhatt",
        email: "test@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#7b61ff",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button className={styles.buyBtn} onClick={handlePayment}>
      Buy Now
    </button>
  );
}

export default Buynow;