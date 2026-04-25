import React, { useEffect, useState } from "react";
import styles from "../../styles/nearbystore.module.css";
import Storeproduct from "../productcard/Storeproduct";

const NearbyStore = () => {
  const [products, setProducts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
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
        mapLink: `https://www.google.com/maps/place/Store+${index}`,
      }));

      setProducts(productsWithLocation);
    };

    fetchProducts();
  }, []);

  const getStoreName = (url) => {
    try {
      const part = url.split("/place/")[1];
      return part ? part.split("/")[0].replace(/\+/g, " ") : "Store";
    } catch {
      return "Store";
    }
  };

  const getDistance = (lat, lng) => {
    if (!userLocation) return "2.0 km";

    const dx = lat - userLocation.lat;
    const dy = lng - userLocation.lng;
    const dist = Math.sqrt(dx * dx + dy * dy) * 111;

    return dist.toFixed(1) + " km";
  };

  const getRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  const handleViewRoute = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Nearby Stores</h2>

      <div className={styles.grid}>
        {products.map((item) => (
          <Storeproduct
            key={item.id}
            product={{
              image: item.thumbnail,
              title: item.title,
              price: item.price,
              location: getStoreName(item.mapLink),
              rating: getRating(),
              distance: getDistance(item.lat, item.lng),
              onViewStore: () => handleViewRoute(item.mapLink),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NearbyStore;