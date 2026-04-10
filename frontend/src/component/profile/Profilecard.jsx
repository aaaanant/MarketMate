import React from "react";
import styles from "./card.module.css";

function Card({ title, icon, children }) {
  return (
    <div className={styles.card}>
      {title && (
        <div className={styles.header}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <h3>{title}</h3>
        </div>
      )}

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default Card;