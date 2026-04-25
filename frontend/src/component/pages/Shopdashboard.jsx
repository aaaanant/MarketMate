import React, { useState, useEffect } from "react";
import styles from "../../styles/shopdashboard.module.css";

function Shopdashboard() {
  const role = localStorage.getItem("role");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    mapLink: "",
    image: ""
  });

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);

    const status = localStorage.getItem("storeStatus");
    setIsOnline(status !== "offline");
  }, []);

  if (role !== "shopkeeper") {
    return <div className={styles.denied}>Access Denied</div>;
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct((prev) => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      alert("Fill all fields");
      return;
    }

    const updatedProducts = [...products, product];

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProduct({
      name: "",
      price: "",
      mapLink: "",
      image: ""
    });
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const toggleStore = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    localStorage.setItem("storeStatus", newStatus ? "online" : "offline");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Shop Dashboard</h1>
          <p>Manage your store and inventory</p>
        </div>

        <button
          className={isOnline ? styles.online : styles.offline}
          onClick={toggleStore}
        >
          {isOnline ? "Store Online" : "Store Offline"}
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.left}>
          <h2>Add Product</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
            />

            <input type="file" onChange={handleImage} />

            <button type="submit">Post Product</button>
          </form>
        </div>

        <div className={styles.right}>
          <div className={styles.inventoryHeader}>
            <h2>Your Inventory ({products.length})</h2>

            <input
              type="text"
              placeholder="Search products..."
              className={styles.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div className={styles.empty}>Inventory Empty</div>
          ) : (
            <div className={styles.grid}>
              {filteredProducts.map((item, index) => (
                <div key={index} className={styles.card}>
                  <img src={item.image} alt="" />
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>

                  <button onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.helpWrapper}>
        <div className={styles.helpBox}>
          <h3>Admin Help</h3>
          <p>
            If you face any issues while adding products or managing your store,
            contact support.
          </p>
          <p>Email: &nbsp;
          <a
            href="mailto:support@marketmate.com"
            className={styles.email}
          >
            support@marketmate.com
          </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shopdashboard;