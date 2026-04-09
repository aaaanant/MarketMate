import React from "react";
import NearbyStore from "./Nearbystore";
import Trendingproduct from "./Trendingproduct";
import styles from "../../styles/home.module.css";

function Home() {
  return (
    <div className={styles.container}>

      <h1 className={styles.heading}>Welcome to MarketMate 🛒</h1>

      <p className={styles.subText}>
        Find nearby stores, compare prices, and shop smarter!
      </p>

      {/* ✅ Nearby Stores */}
      <div className={styles.section}>
        <NearbyStore />
      </div>

      {/* ✅ Trending Products */}
      <div className={styles.section}>
        <Trendingproduct />
      </div>

    </div>
  );
}

export default Home;