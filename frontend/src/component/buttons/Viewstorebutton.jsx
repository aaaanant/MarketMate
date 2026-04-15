import React from "react";
import styles from "../../styles/button/viewstorebutton.module.css";

const ViewStoreButton = ({ onClick }) => {
  return (
    <button className={styles.viewBtn} onClick={onClick}>
      View Store
    </button>
  );
};

export default ViewStoreButton;