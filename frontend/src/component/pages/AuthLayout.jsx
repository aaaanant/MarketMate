import React, { useState } from "react";
import styles from "../../styles/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthLayout = ({ isLogin, onSwitch }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    shopName: "",
    shopAddress: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const BASE_URL = import.meta.env.VITE_API_URL;

      const url = isLogin
        ? `${BASE_URL}/api/auth/login`
        : `${BASE_URL}/api/auth/signup`;

      let payload = {};

      if (isLogin) {
        payload = {
          email: formData.email,
          password: formData.password
        };
      } else {
        payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        };

        if (formData.role === "shopkeeper") {
          payload.shop = {
            shopName: formData.shopName,
            shopAddress: formData.shopAddress
          };
        }
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);

          const decoded = jwtDecode(data.token);
          console.log("Decoded:", decoded);

          const userRole = decoded.role || decoded.user?.role;

          localStorage.setItem("role", userRole);

         if (userRole === "shopkeeper") {
  navigate("/shopdashboard"); 
} else {
  navigate("/");
}

          window.location.reload();
        } else {
          navigate("/login");
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.card}>
        
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

        <div className={styles.right}>
          
          <h2>{isLogin ? "Login" : "Create Account"}</h2>

          <p className={styles.subText}>
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Join MarketMate today and start shopping."}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            
            {!isLogin && (
              <input name="username" type="text" placeholder="Username" onChange={handleChange} />
            )}

            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />

            {!isLogin && (
              <>
                <input name="phone" type="text" placeholder="Phone Number" onChange={handleChange} />

                <select name="role" onChange={handleChange}>
                  <option value="user">User</option>
                  <option value="shopkeeper">Shopkeeper</option>
                </select>

                {formData.role === "shopkeeper" && (
                  <>
                    <input name="shopName" type="text" placeholder="Shop Name" onChange={handleChange} />
                    <input name="shopAddress" type="text" placeholder="Shop Address" onChange={handleChange} />
                  </>
                )}

                <div className={styles.checkbox}>
                  <input type="checkbox" />
                  <span>I agree to Terms & Privacy</span>
                </div>
              </>
            )}

            <button className={styles.signupBtn}>
              {isLogin ? "Login" : "Sign Up"}
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