import React, { useEffect, useState } from "react";
import styles from "../../styles/profile/profileheader.module.css";

function Profileheader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        setUser(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  // 🔥 Loading state
  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        
        {/* ✅ Default Profile Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className={styles.avatar}
        />

        <div>
          <h2>Welcome back, {user.username}</h2>
          <p>
            {user.email} • {user.phone}
          </p>
          <button className={styles.btn}>Edit Profile</button>
        </div>

      </div>
    </div>
  );
}

export default Profileheader;