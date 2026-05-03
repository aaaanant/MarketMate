import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/trendingproduct.module.css";
import Cartbutton from "../buttons/Cartbutton";
import Buynow from "../buttons/Buynow";
import Productcard from "../productcard/Productcard";
import Buttonleftright from "../buttons/Buttonleftright";

function Trendingproduct() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 8);
        setProducts(randomProducts);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Trending Products</h2>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.scrollContainer}>
            <Buttonleftright scrollRef={scrollRef} />

            <div ref={scrollRef} className={styles.scroll}>
              {products.map((item) => (
                <div className={styles.cardWrap} key={item.id}>
                  <Productcard
                    product={{
                      image: item.image,
                      title: item.title,
                      price: Math.round(item.price * 80),
                    }}
                  >
                    <Cartbutton product={item} />
                    <Buynow product={item} />
                  </Productcard>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trendingproduct;