import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.module.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className={styles.navbar}>
      
      {/* Logo */}
      <h2 className={styles.logo}>MarketMate</h2>

      {/* 🔍 Search (always visible) */}
      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
      />

      {/* ☰ Hamburger */}
      <div
        className={styles.menuIcon}
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      {/* Links */}
      <div className={`${styles.links} ${open ? styles.show : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/store">Stores</Link>
        <Link to="/cart">🛒Cart</Link>

        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/profile">My Profile</Link>
        )}
      </div>

    </div>
  );
}

export default Navbar;