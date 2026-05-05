import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/productcard/insidecard.module.css";
import Cartbutton from "../buttons/Cartbutton";
import Buynow from "../buttons/Buynow";

function Insidecard() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) return <div>Product not found</div>;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [offerPrice, setOfferPrice] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  const basePrice = Number(product.price);

  const amazonPrice = basePrice + Math.floor(Math.random() * 200 + 50);
  const flipkartPrice = basePrice + Math.floor(Math.random() * 300 + 100);

  const amazonDelivery = ["Tomorrow", "1 Day", "2 Days"][
    Math.floor(Math.random() * 3)
  ];

  const flipkartDelivery = ["2-3 Days", "3-4 Days", "Tomorrow"][
    Math.floor(Math.random() * 3)
  ];

  const priceChange = Math.floor(Math.random() * 10 - 5); 
  const trend = priceChange > 0 ? "UP 📈" : "DOWN 📉";
  const confidence = Math.floor(Math.random() * 40 + 60); 

  useEffect(() => {
    const allReviews =
      JSON.parse(localStorage.getItem("reviews")) || [];

    const productReviews = allReviews.filter(
      (r) => r.productId === product._id
    );

    setReviews(productReviews);
  }, [product._id]);

  const handleBargain = async () => {
    if (!offerPrice) {
      alert("Enter price");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/bargain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: product._id,
          offeredPrice: offerPrice,
          originalPrice: product.price,
          userId: localStorage.getItem("userId"),
          storeId: product.userEmail
        })
      });
    } catch (err) {
      console.log(err);
    }

    const request = {
      productId: product._id,
      productName: product.title,
      offerPrice,
      buyerEmail: localStorage.getItem("email"),
      sellerEmail: product.userEmail || "unknown"
    };

    const existing =
      JSON.parse(localStorage.getItem("bargainRequests")) || [];

    localStorage.setItem(
      "bargainRequests",
      JSON.stringify([...existing, request])
    );

    setOfferPrice("");
    alert("Offer sent to seller");
  };

  const handleReviewSubmit = () => {
    if (!reviewText) {
      alert("Enter review");
      return;
    }

    const newReview = {
      productId: product._id,
      text: reviewText,
      user: localStorage.getItem("email")
    };

    const existing =
      JSON.parse(localStorage.getItem("reviews")) || [];

    localStorage.setItem(
      "reviews",
      JSON.stringify([...existing, newReview])
    );

    setReviews([...reviews, newReview]);
    setReviewText("");
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.left}>
        <div className={styles.imageBox}>
          <img
            src={selectedImage || product.image}
            alt="product"
            className={styles.mainImage}
          />
        </div>

        <div className={styles.thumbnailRow}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumb"
              className={
                selectedImage === img ? styles.activeThumb : ""
              }
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>

        <div className={styles.rating}>
          <span className={styles.star}>★★★★☆</span>
          <span className={styles.review}>
            {product.rating || 4.2} ({product.reviews || 120} reviews)
          </span>
        </div>

        <div className={styles.priceBox}>
          <span className={styles.price}>₹{basePrice}</span>
          <span className={styles.oldPrice}>₹{basePrice + 200}</span>
          <span className={styles.discount}>10% OFF</span>
        </div>

        <div className={styles.predictionBox}>
          <h3>Price Prediction</h3>
          <p>
            Trend: <b>{trend}</b>
          </p>
          <p>
            Expected Change: ₹{priceChange}
          </p>
          <p>
            Confidence: {confidence}%
          </p>
        </div>

        <div className={styles.buttons}>
          <Cartbutton product={product} />
          <Buynow product={product} />
        </div>

       <div className={styles.bargainBox}>
  <h3>Try Bargaining</h3>
  <p className={styles.bargainSub}>
    Negotiate with seller and get better price
  </p>

  <div className={styles.suggestPrice}>
    Suggested: ₹{basePrice - 100}
  </div>

  <div className={styles.bargainInput}>
    <input
      type="number"
      value={offerPrice}
      onChange={(e) => setOfferPrice(e.target.value)}
      placeholder="Enter your offer"
    />
    <button onClick={handleBargain}>Send Offer</button>
  </div>

  <div className={styles.bargainStatus}>
    <span className={styles.accepted}>Accepted</span>
    <span className={styles.counter}>Counter</span>
    <span className={styles.rejected}>Rejected</span>
  </div>
</div>

        {/* COMPARISON */}
        <div className={styles.comparisonSection}>
          <h2 className={styles.compTitle}>Market Comparison</h2>

          <div className={styles.table}>
            <div className={styles.rowHeader}>
              <span>Store</span>
              <span>Price</span>
              <span>Delivery</span>
              <span>Action</span>
            </div>

            <div className={styles.row}>
              <span>Amazon</span>
              <span>₹{amazonPrice}</span>
              <span>{amazonDelivery}</span>
              <button className={styles.viewBtn}>View</button>
            </div>

            <div className={`${styles.row} ${styles.best}`}>
              <span>MarketMate</span>
              <span className={styles.bestPrice}>₹{basePrice}</span>
              <span>Today</span>
              <button className={styles.claimBtn}>Best</button>
            </div>

            <div className={styles.row}>
              <span>Flipkart</span>
              <span>₹{flipkartPrice}</span>
              <span>{flipkartDelivery}</span>
              <button className={styles.viewBtn}>View</button>
            </div>
          </div>
        </div>

        {/* REVIEW */}
        <div className={styles.reviewSection}>
          <h2 className={styles.reviewTitle}>Customer Reviews</h2>

          <div className={styles.reviewInputBox}>
            <input
              type="text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className={styles.reviewInput}
              placeholder="Write review"
            />
            <button
              onClick={handleReviewSubmit}
              className={styles.reviewBtn}
            >
              Submit
            </button>
          </div>

          {reviews.length === 0 ? (
            <p className={styles.noReview}>No reviews yet</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className={styles.reviewCard}>
                <p>{r.text}</p>
                <span>{r.user}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Insidecard;