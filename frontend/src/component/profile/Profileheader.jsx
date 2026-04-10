import React from "react";
import styles from "../../styles/profile/profileheader.module.css";

function Profileheader() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className={styles.avatar}
        />

        <div>
          <h2>Welcome back, Anant</h2>
          <p>anant@email.com • +91 9876543210</p>
          <button className={styles.btn}>Edit Profile</button>
        </div>

      </div>
    </div>
  );
}

export default Profileheader;