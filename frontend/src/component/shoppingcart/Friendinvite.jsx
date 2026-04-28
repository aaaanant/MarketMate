import React, { useState, useEffect } from "react";
import styles from "../../styles/invitefriend.module.css";

function Friendinvite() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/${cartId}`
        );
        const data = await res.json();

        if (data.sharedWith) {
          setFriends(data.sharedWith);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchFriends();
  }, []);

  const handleAdd = () => {
    if (!email) return;

    if (friends.includes(email)) {
      alert("Already added");
      return;
    }

    setFriends([...friends, email]);
    setEmail("");
  };

  const handleInvite = async () => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      alert("Cart not found");
      return;
    }

    try {
      for (let friendEmail of friends) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/invite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: friendEmail,
              cartId,
            }),
          }
        );
      }

      alert("Invites saved");
    } catch (err) {
      console.log(err);
      alert("Error sending invites");
    }
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

      {friends.length > 0 && (
        <button className={styles.inviteBtn} onClick={handleInvite}>
          Save Invites
        </button>
      )}
    </div>
  );
}

export default Friendinvite;