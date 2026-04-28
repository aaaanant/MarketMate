import React, { useEffect, useState } from "react";
import Productcard from "../productcard/Productcard";
import Cartbutton from "../buttons/Cartbutton";
import styles from "../../styles/suggestionproduct.module.css";

function SuggestionProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <h2>You may also like</h2>

      <div className={styles.row}>
        {products.slice(0, 5).map((product) => (
          <Productcard key={product.id} product={product}>
            <Cartbutton product={product} Text="Add" />
          </Productcard>
        ))}
      </div>
    </div>
  );
}

export default SuggestionProduct;