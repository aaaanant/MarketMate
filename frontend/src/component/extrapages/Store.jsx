import React, { useEffect, useState } from "react";
import styles from "../../styles/store.module.css";
import Cartbutton from "../buttons/Cartbutton";
import ViewStoreButton from "../buttons/Viewstorebutton";
import Productcard from "../productcard/Productcard";
import Useraddress from "../address/Useraddress";
function Store() {
  const [apiProducts, setApiProducts] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => setApiProducts(data.products));

    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setLocalProducts(saved);
  }, []);

  return (
    <>
    <Useraddress/>
    <div className={styles.container}>
      <h2 className={styles.heading}>Store Products</h2>

      <div className={styles.grid}>
        
        {localProducts.map((item, index) => (
          <Productcard
            key={index}
            product={{
              image: "https://via.placeholder.com/150",
              title: item.name,
              price: item.price,
            }}
          >
            <ViewStoreButton
              onClick={() => window.open(item.mapLink, "_blank")}
            />
            <Cartbutton product={item} />
          </Productcard>
        ))}

        {apiProducts.map((item) => (
          <Productcard
            key={item.id}
            product={{
              image: item.thumbnail,
              title: item.title,
              price: Math.round(item.price * 84),
            }}
          >
            <ViewStoreButton
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${item.title}`,
                  "_blank"
                )
              }
            />
            <Cartbutton product={item} />
          </Productcard>
        ))}
      </div>
    </div>
    </>
  );
}

export default Store;