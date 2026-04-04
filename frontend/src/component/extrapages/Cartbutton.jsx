import React from "react";
import styles from "../../styles/cartbutton.module.css";

const AddToCartButton = ({ onClick }) => {
  return (
    <button className={styles.cartBtn} onClick={onClick}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;