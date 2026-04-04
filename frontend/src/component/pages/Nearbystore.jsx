import React, { useEffect, useState } from "react";
import styles from "../../styles/nearbyStore.module.css";

import AddToCartButton from "../extrapages/Cartbutton";
import ViewStoreButton from "../extrapages/Viewstorebutton";

const NearbyStore = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => {

        // 🔥 Add shop locations (lat, lng)
        const productsWithLocation = data.products.map((item, index) => ({
          ...item,
          lat:
            index === 0
              ? 30.3965856
              : index === 1
              ? 30.3256
              : index === 2
              ? 30.3244
              : 30.2887,
          lng:
            index === 0
              ? 77.9189735
              : index === 1
              ? 78.0437
              : index === 2
              ? 78.0417
              : 77.9986,
        }));

        setProducts(productsWithLocation);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 ROUTE FUNCTION (USER → SHOP)
  const handleViewRoute = (shopLat, shopLng) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${shopLat},${shopLng}`;

        window.open(url, "_blank");
      },
      () => {
        alert("Please allow location access");

        // 🔥 fallback (without user location)
        const url = `https://www.google.com/maps/dir/?api=1&destination=${shopLat},${shopLng}`;
        window.open(url, "_blank");
      }
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Nearby Stores 🏪</h2>

      <div className={styles.grid}>
        {products.map((item) => (
          <div key={item.id} className={styles.card}>

            {/* IMAGE */}
            <img src={item.thumbnail} alt={item.title} />

            <h3>{item.title}</h3>

            <p className={styles.price}>₹ {item.price}</p>

            <div className={styles.buttons}>

              {/* 🔥 VIEW ROUTE BUTTON */}
              <ViewStoreButton
                onClick={() => handleViewRoute(item.lat, item.lng)}
              />

              {/* 🛒 ADD TO CART */}
              <AddToCartButton
                onClick={() => alert("Added to cart")}
              />

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyStore;