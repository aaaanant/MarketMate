import React, { useState } from "react";
import styles from "../../styles/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { apiRequest } from "../../utils/api";

const AuthLayout = ({ isLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    shopName: "",
    mapLink: ""
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
      let endpoint = "";
      let payload = {};

      if (isLogin) {
        endpoint = "/api/auth/login";
        payload = {
          email: formData.email,
          password: formData.password,
        };
      } else {
        localStorage.removeItem("token");

        endpoint = "/api/auth/signup";
        payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role,
        };

        if (formData.role === "shopkeeper") {
          payload.shop = {
            shopName: formData.shopName,
            mapLink: formData.mapLink,
          };
        }
      }

      const data = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", formData.email);

        const decoded = jwtDecode(data.token);
        const userRole = decoded.role;

        localStorage.setItem("role", userRole);

        if (userRole === "shopkeeper") {
          navigate("/shopdashboard");
        } else {
          navigate("/");
        }

        window.location.reload();
      } else {
        alert("Signup successful");
        navigate("/login");
      }

    } catch (error) {
      alert(error.message);
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
                    <input name="mapLink" type="text" placeholder="Google Map Link" onChange={handleChange} />
                  </>
                )}
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