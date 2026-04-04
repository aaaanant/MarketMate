import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* 🔥 Brand */}
        <div className={styles.section}>
          <h2 className={styles.logo}>MarketMate 🛒</h2>
          <p className={styles.desc}>
            Find nearby stores, compare prices, and shop smarter.
          </p>
        </div>

        {/* 🔥 Links */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/stores">Stores</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>

        {/* 🔥 Features */}
        <div className={styles.section}>
          <h3>Features</h3>
          <p>Nearby Stores</p>
          <p>Smart Cart</p>
          <p>Best Deals</p>
          <p>Secure Checkout</p>
        </div>

        {/* 🔥 Contact */}
        <div className={styles.section}>
          <h3>Contact</h3>
          <p>support@marketmate.com</p>
          <p>+91 XXXXX XXXXX</p>

          <div className={styles.socials}>
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>

      </div>

      {/* 🔥 Bottom */}
      <div className={styles.bottom}>
        © 2026 MarketMate. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;