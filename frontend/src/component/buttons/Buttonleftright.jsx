import React from "react";
import styles from "../../styles/button/buttonleftright.module.css";

function Buttonleftright({ scrollRef }) {
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.left} onClick={scrollLeft}>
        ◀
      </button>
      <button className={styles.right} onClick={scrollRight}>
        ▶
      </button>
    </div>
  );
}

export default Buttonleftright;