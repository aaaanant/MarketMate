import React from "react";
import NearbyStore from "./Nearbystore";
function Home() {
  return (
    <div style={styles.container}>
      
      <h1 style={styles.heading}>Welcome to MarketMate 🛒</h1>
      
      <p style={styles.subText}>
        Find nearby stores, compare prices, and shop smarter!
      </p>

      <div style={styles.cardContainer}>

        {/* <div style={styles.card}>
          <h3>🏪 Nearby Stores</h3>
          <p>Explore shops around your location.</p>
        </div>

        <div style={styles.card}>
          <h3>🛍️ Smart Cart</h3>
          <p>Add items and share carts with friends.</p>
        </div>

        <div style={styles.card}>
          <h3>💸 Best Deals</h3>
          <p>Get discounts and compare prices easily.</p>
        </div> */}

        <NearbyStore/>

      </div>

    </div>
  );
}

export default Home;

/* 🔥 Styles */
const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    background: "#f9f9ff",
    minHeight: "100vh"
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px"
  },
  subText: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px"
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },
  card: {
    background: "#fff",
    padding: "20px",
    width: "250px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }
};