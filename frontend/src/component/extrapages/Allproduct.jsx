import React, { useEffect, useState } from "react";
import Productcard from "../productcard/Productcard";
import Cartbutton from "../buttons/Cartbutton";
import Buynow from "../buttons/Buynow";
import styles from "../../styles/allproduct.module.css";

function Allproduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("globalProducts")) || [];

    const formatted = data.map((item, index) => ({
      id: index,
      _id: index,
      title: item.name,
      price: Number(item.price),
      image: item.image,
      images: item.image ? [item.image] : [],
      userEmail: item.userEmail
    }));

    setProducts(formatted);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>All Products</h2>

      <div className={styles.grid}>
        {products.map((item) => (
          <Productcard key={item.id} product={item}>
            <Cartbutton product={item} />
            <Buynow product={item} />
          </Productcard>
        ))}
      </div>
    </div>
  );
}

export default Allproduct;