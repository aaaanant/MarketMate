import React from "react";
import styles from "../../styles/productcard/storeproduct.module.css";
import Cartbutton from "../buttons/Cartbutton";
import ViewStoreButton from "../buttons/Viewstorebutton";

function Storeproduct({ product }) {
  const {
    image,
    title,
    price,
    location,
    rating,
    distance,
    onViewStore,
  } = product;

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.price}>₹ {price}</p>

      <p className={styles.location}>
        Shop Name: {location || "Store"}
      </p>

      <div className={styles.extra}>
        <span>⭐ {rating}</span>
        <span>{distance}</span>
      </div>

      <div className={styles.buttons}>
        <ViewStoreButton onClick={onViewStore} />
        <Cartbutton product={product} />
      </div>
    </div>
  );
}

export default Storeproduct;