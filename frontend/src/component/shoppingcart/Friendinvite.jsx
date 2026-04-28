import React, { useState, useEffect } from "react";
import styles from "../../styles/invitefriend.module.css";

function Friendinvite() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);

  const userEmail = localStorage.getItem("email");

  const storageKey = `friends_${userEmail}`;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageKey)) || [];
    setFriends(data);
  }, [storageKey]);

  const handleAdd = () => {
    if (!email) return;

    if (friends.includes(email)) {
      alert("Already added");
      return;
    }

    const updated = [...friends, email];
    setFriends(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setEmail("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Collaborative Shopping</h2>
      <p className={styles.subtitle}>
        Invite friends to add items to this cart.
      </p>

      <div className={styles.inputRow}>
        <input
          type="email"
          placeholder="Enter email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.membersRow}>
        <span className={styles.label}>Party Members</span>

        <div className={styles.avatars}>
          <div className={styles.addCircle}>+</div>

          {friends.map((f, i) => (
            <div key={i} className={styles.avatar}>
              {f.charAt(0).toUpperCase()}
            </div>
          ))}

          <span className={styles.you}>YOU</span>
        </div>

        <span className={styles.manage}>Manage</span>
      </div>
    </div>
  );
}

export default Friendinvite;