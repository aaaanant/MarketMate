import React from "react";
import styles from "../../styles/button/logoutbutton.module.css";

function Logoutbutton({ text = "Logout" }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <button className={styles.logoutBtn} onClick={handleLogout}>
      {text}
    </button>
  );
}

export default Logoutbutton;