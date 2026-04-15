import React, { useState, useEffect } from "react";
import styles from "../../styles/shopdashboard.module.css";

function Shopdashboard() {
  const role = localStorage.getItem("role");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    mapLink: ""
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  if (role !== "shopkeeper") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied ❌</h2>
        <p>You are not authorized to view this page</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.mapLink) {
      alert("Please fill all fields");
      return;
    }

    const updatedProducts = [...products, product];

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProduct({
      name: "",
      price: "",
      mapLink: ""
    });
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🏪 Shop Dashboard</h1>

      {/* FORM */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mapLink"
          placeholder="Google Map Link"
          value={product.mapLink}
          onChange={handleChange}
        />

        <button type="submit">Post Product</button>
      </form>

      {/* PRODUCTS */}
      <div className={styles.grid}>
        {products.length === 0 ? (
          <p className={styles.empty}>No products added yet</p>
        ) : (
          products.map((item, index) => (
            <div key={index} className={styles.card}>
              <h3>{item.name}</h3>
              <p className={styles.price}>₹ {item.price}</p>

              <a
                href={item.mapLink}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                View Route 📍
              </a>

              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shopdashboard;