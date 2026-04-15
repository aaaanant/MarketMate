import React, { useEffect, useState } from "react";
import styles from "../../styles/nearbystore.module.css";

import Cartbutton from "../buttons/Cartbutton";
import ViewStoreButton from "../buttons/Viewstorebutton";
import Productcard from "../productcard/Productcard";

const NearbyStore = () => {
  const [products, setProducts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
      },
      () => {}
    );
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=4");
      const data = await res.json();

      const productsWithLocation = data.products.map((item, index) => ({
        ...item,
        lat: 30.3 + index,
        lng: 77.9 + index,
      }));

      setProducts(productsWithLocation);
    };

    fetchProducts();
  }, []);

  const handleViewRoute = (shopLat, shopLng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shopLat},${shopLng}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Nearby Stores 🏪</h2>

      <div className={styles.grid}>
        {products.map((item) => (
          <Productcard
            key={item.id}
            product={{
              image: item.thumbnail,
              title: item.title,
              price: item.price,
            }}
          >
            <ViewStoreButton
              onClick={() => handleViewRoute(item.lat, item.lng)}
            />
            <Cartbutton product={item} />
          </Productcard>
        ))}
      </div>
    </div>
  );
};

export default NearbyStore;