import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.module.css";

function Navbar({ isDashboard }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className={styles.navbar}>
      <h2 className={styles.logo}>MarketMate</h2>

      {!isDashboard && (
        <input
          type="text"
          placeholder="Search..."
          className={styles.search}
        />
      )}

      <div
        className={styles.menuIcon}
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      <div className={`${styles.links} ${open ? styles.show : ""}`}>
        {!isDashboard && (
          <>
            <Link to="/">Home</Link>
            <Link to="/store">Stores</Link>
            <Link to="/cart">Cart</Link>

            <div
              className={styles.dropdown}
              onClick={() => setDropdown(!dropdown)}
            >
              Others
              {dropdown && (
                <div className={styles.dropdownMenu}>
                  <Link to="/orders">Orders</Link>
                  <Link to="/category">Category</Link>
                  <Link to="/address">Saved Address</Link>
                </div>
              )}
            </div>
          </>
        )}

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