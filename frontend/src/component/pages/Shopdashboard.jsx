import React, { useState, useEffect } from "react";
import styles from "../../styles/shopdashboard.module.css";

function Shopdashboard() {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [globalProduct, setGlobalProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`products_${email}`)) || [];
    setProducts(saved);

    const status = localStorage.getItem("storeStatus");
    setIsOnline(status !== "offline");

    loadRequests();
  }, [email]);

  const loadRequests = () => {
    const allRequests =
      JSON.parse(localStorage.getItem("bargainRequests")) || [];

    const filtered = allRequests.filter(
      (req) => req.sellerEmail === email
    );

    setRequests(filtered);
  };

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

  // ✅ EXISTING PRODUCT (NEARBY) — SAFE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      name: product.name,
      price: product.price,
      image: product.image,
      userEmail: email,
      mapLink: localStorage.getItem("mapLink"),
      shopName: localStorage.getItem("shopName")
    };

    try {
      await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });
    } catch (err) {
      console.log(err);
    }

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    localStorage.setItem(
      `products_${email}`,
      JSON.stringify(updatedProducts)
    );

    setProduct({
      name: "",
      price: "",
      image: ""
    });
  };

  // ✅ GLOBAL PRODUCT
  const handleGlobalChange = (e) => {
    setGlobalProduct({
      ...globalProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleGlobalImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setGlobalProduct((prev) => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();

    if (!globalProduct.name || !globalProduct.price) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      ...globalProduct,
      userEmail: email
    };

    // global save
    const globalExisting =
      JSON.parse(localStorage.getItem("globalProducts")) || [];

    localStorage.setItem(
      "globalProducts",
      JSON.stringify([...globalExisting, newProduct])
    );

    // inventory save
    const inventoryExisting =
      JSON.parse(localStorage.getItem(`products_${email}`)) || [];

    const updatedInventory = [...inventoryExisting, newProduct];

    localStorage.setItem(
      `products_${email}`,
      JSON.stringify(updatedInventory)
    );

    setProducts(updatedInventory);

    setGlobalProduct({
      name: "",
      price: "",
      image: ""
    });

    alert("Added to Global + Inventory");
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);

    localStorage.setItem(
      `products_${email}`,
      JSON.stringify(updated)
    );
  };

  const toggleStore = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);

    localStorage.setItem(
      "storeStatus",
      newStatus ? "online" : "offline"
    );
  };

  // ✅ BARGAIN STATUS UPDATE
  const updateRequestStatus = (index, status) => {
    const allRequests =
      JSON.parse(localStorage.getItem("bargainRequests")) || [];

    const target = requests[index];

    const updated = allRequests.map((r) => {
      if (
        r.productId === target.productId &&
        r.buyerEmail === target.buyerEmail
      ) {
        return { ...r, status };
      }
      return r;
    });

    localStorage.setItem("bargainRequests", JSON.stringify(updated));

    loadRequests();
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
            <input name="name" placeholder="Product Name" onChange={handleChange} />
            <input name="price" placeholder="Price" onChange={handleChange} />
            <input type="file" onChange={handleImage} />
            <button type="submit">Post Product</button>
          </form>

          <h2 style={{ marginTop: "20px" }}>Add Global Product</h2>

          <form className={styles.form} onSubmit={handleGlobalSubmit}>
            <input name="name" placeholder="Product Name" onChange={handleGlobalChange} />
            <input name="price" placeholder="Price" onChange={handleGlobalChange} />
            <input type="file" onChange={handleGlobalImage} />
            <button type="submit">Add to All Products</button>
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

          {/* BARGAIN */}
          <h2 style={{ marginTop: "20px" }}>Bargain Requests</h2>

          {requests.length === 0 ? (
            <p>No requests</p>
          ) : (
            requests.map((req, index) => (
              <div key={index} className={styles.card}>
                <h4>{req.productName}</h4>
                <p>Offer: ₹{req.offerPrice}</p>
                <p>Buyer: {req.buyerEmail}</p>
                <p>Status: {req.status || "Pending"}</p>

                <button onClick={() => updateRequestStatus(index, "Accepted")}>
                  Accept
                </button>

                <button onClick={() => updateRequestStatus(index, "Rejected")}>
                  Reject
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Shopdashboard;