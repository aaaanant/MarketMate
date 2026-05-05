import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/footer.module.css";

function Footer({ isDashboard }) {
  if (isDashboard) {
    return (
      <div className={styles.bottom}>
        © 2026 MarketMate. All rights reserved.
      </div>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.logo}>MarketMate</h2>
          <p className={styles.desc}>
            Find nearby stores, compare prices, and shop smarter.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/stores">Stores</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className={styles.section}>
          <h3>Features</h3>
          <p>Nearby Stores</p>
          <p>Smart Cart</p>
          <p>Best Deals</p>
          <p>Secure Checkout</p>
        </div>

        <div className={styles.section}>
          <h3>Contact</h3>
          <p>support@marketmate.com</p>
          <p>+91 987654321</p>
        </div>
      </div>

      <div className={styles.bottom}>
        © 2026 MarketMate. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;