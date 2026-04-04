import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.module.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className={styles.navbar}>
      
      {/* Logo */}
      <h2 className={styles.logo}>MarketMate</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
      />

      {/* Links */}
     <div className={styles.links}>
  <Link to="/">Home</Link>
  <Link to="/stores">Stores</Link>
  <Link to="/cart">🛒Cart</Link>

  {!isLoggedIn ? (
    <Link to="/login" className={styles.authBtn}>Login</Link>
  ) : (
    <Link to="/profile" className={styles.authBtn}>My Profile</Link>
  )}
</div>

    </div>
  );
}

export default Navbar;