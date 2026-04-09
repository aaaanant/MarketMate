import React, { useEffect, useState } from "react";
import styles from "../../styles/nearbystore.module.css";

import AddToCartButton from "../extrapages/Cartbutton";
import ViewStoreButton from "../extrapages/Viewstorebutton";

const NearbyStore = () => {
  const [products, setProducts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // 📍 GET USER LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("User Location:", lat, lng);
        setUserLocation({ lat, lng });
      },
      (err) => {
        console.log("Location Error:", err);
        alert("Location access denied. Using default.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  // 🛒 FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=4");
        const data = await res.json();

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
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };

    fetchProducts();
  }, []);

  // 🗺️ ROUTE FUNCTION
  const handleViewRoute = (shopLat, shopLng) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${shopLat},${shopLng}`;
      window.open(url, "_blank");
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${shopLat},${shopLng}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Nearby Stores 🏪</h2>

      {products.length === 0 ? (
        <p>Loading stores...</p>
      ) : (
        <div className={styles.grid}>
          {products.map((item) => (
            <div key={item.id} className={styles.card}>
              
              {/* IMAGE */}
              <img src={item.thumbnail} alt={item.title} />

              {/* TITLE */}
              <h3>{item.title}</h3>

              {/* PRICE */}
              <p className={styles.price}>₹ {item.price}</p>

              {/* BUTTONS */}
              <div className={styles.buttons}>

                {/* VIEW STORE */}
                <ViewStoreButton
                  onClick={() => handleViewRoute(item.lat, item.lng)}
                />

                {/* ADD TO CART (UNIVERSAL) */}
                <AddToCartButton
                  product={{
                    _id: item.id,
                    name: item.title,
                    price: item.price,
                    image: item.thumbnail
                  }}
                />

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyStore;