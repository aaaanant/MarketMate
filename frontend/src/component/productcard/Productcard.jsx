import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/productcard/productcard.module.css";

function Productcard({ product, children }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id || product.id}`, {
      state: { product }   
    });
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>

      <p>₹ {product.price}</p>

      <div
        className={styles.btnGroup}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

    </div>
  );
}

export default Productcard;