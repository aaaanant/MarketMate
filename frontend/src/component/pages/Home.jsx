import React from "react";
import Useraddress from "../address/Useraddress";
import Slider from "../Slider";
import NearbyStore from "./Nearbystore";
import Trendingproduct from "./Trendingproduct";
import SuggestionProduct from "../extrapages/SuggestionProduct";
import styles from "../../styles/home.module.css";

function Home() {
  return (
    <>
    <Useraddress/>
    <Slider/>
    <div className={styles.container}>

      <h1 className={styles.heading}>Welcome to MarketMate</h1>

      <p className={styles.subText}>
        Find nearby stores, compare prices, and shop smarter!
      </p>

      <div className={styles.section}>
        <NearbyStore />
      </div>

      <div className={styles.section}>
        <Trendingproduct />
      </div>
      <div className={styles.section}>
        <SuggestionProduct />
      </div>

    </div>
    </>
  );
}

export default Home;