import React, { useEffect, useState } from "react";
import styles from "../../styles/store.module.css";
import AddToCartButton from "../extrapages/Cartbutton";
import ViewStoreButton from "../extrapages/Viewstorebutton";

function Store() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=12");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🏪 Store Products</h2>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.grid}>
          {products.map((item) => (
            <div key={item.id} className={styles.card}>

              <img src={item.thumbnail} alt={item.title} />

              <h3>{item.title}</h3>

              <p className={styles.price}>₹ {Math.round(item.price * 84)}</p>

              <div className={styles.buttons}>
                <ViewStoreButton onClick={() => alert("Store location coming soon!")} />
                <AddToCartButton
                  product={{
                    _id: item.id,
                    name: item.title,
                    price: Math.round(item.price * 84),
                    image: item.thumbnail,
                  }}
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Store;