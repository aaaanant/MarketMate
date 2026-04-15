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
        const res = await fetch(`http://localhost:5000/api/cart/${cartId}`);
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

  const handleRemove = (index) => {
    const updated = friends.filter((_, i) => i !== index);
    setFriends(updated);
  };

  const handleInvite = async () => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      alert("Cart not found");
      return;
    }

    try {
      for (let friendEmail of friends) {
        await fetch("http://localhost:5000/api/cart/invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: friendEmail,
            cartId,
          }),
        });
      }

      alert("Invites saved ✅");
    } catch (err) {
      console.log(err);
      alert("Error sending invites");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Invite Friends</h2>

      <div className={styles.inputBox}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className={styles.list}>
        {friends.map((f, i) => (
          <div key={i} className={styles.item}>
            <span>{f}</span>
            <button onClick={() => handleRemove(i)}>❌</button>
          </div>
        ))}
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