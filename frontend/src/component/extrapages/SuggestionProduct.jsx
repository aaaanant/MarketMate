import React, { useEffect, useState, useRef } from "react";
import Productcard from "../productcard/Productcard";
import Cartbutton from "../buttons/Cartbutton";
import Buttonleftright from "../buttons/Buttonleftright";
import styles from "../../styles/suggestionproduct.module.css";

function SuggestionProduct() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>You may also like</h2>

      <div className={styles.wrapper}>
        <div className={styles.scrollContainer}>
          <Buttonleftright scrollRef={scrollRef} />

          <div ref={scrollRef} className={styles.scroll}>
            {products.slice(0, 10).map((product) => (
              <div className={styles.cardWrap} key={product.id}>
                <Productcard product={product}>
                  <Cartbutton product={product} Text="Add" />
                </Productcard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionProduct;