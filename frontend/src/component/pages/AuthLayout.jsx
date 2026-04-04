import React, { useState } from "react";
import styles from "../../styles/auth.module.css";
import { Link, useNavigate } from "react-router-dom";

const AuthLayout = ({ isLogin }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ ENV BASE URL
      const BASE_URL = import.meta.env.VITE_API_URL;

      const url = isLogin
        ? `${BASE_URL}/api/auth/login`
        : `${BASE_URL}/api/auth/signup`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      // ✅ Success
      if (res.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          navigate("/");
          window.location.reload();
        } else {
          alert("Signup successful! Please login.");
          navigate("/login");
        }
      } else {
        // ❌ Error handling
        alert(data.message || "Something went wrong");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.icon}>🛍️</div>

          <h1>
            Welcome to <span>MarketMate</span>
          </h1>

          <p>
            Shop smarter with nearby stores and shared carts.
            Join our community to unlock exclusive deals.
          </p>

          <ul>
            <li>Access to local stores instantly</li>
            <li>Collaborative shared carts</li>
            <li>Fast & secure checkout</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>

          <h2>{isLogin ? "Login" : "Create Account"}</h2>

          <p className={styles.subText}>
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Join MarketMate today and start shopping."}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>

            {!isLogin && (
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />

                <div className={styles.checkbox}>
                  <input type="checkbox" required />
                  <span>I agree to Terms & Privacy</span>
                </div>
              </>
            )}

            <button className={styles.signupBtn} disabled={loading}>
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          <p className={styles.loginText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}

            <Link to={isLogin ? "/signup" : "/login"}>
              {isLogin ? "Signup" : "Login"}
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;