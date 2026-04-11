import React, { useState } from "react";
import styles from "../../styles/invitefriend.module.css";

function Friendinvite() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);

  const handleAdd = () => {
    if (email.trim() === "") return;

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
        const res = await fetch("http://localhost:5000/api/cart/invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: friendEmail,
            cartId: cartId,
          }),
        });

        const data = await res.json();
        console.log(data);
      }

      alert("Invites sent successfully ✅");
      setFriends([]);

    } catch (err) {
      console.log(err);
      alert("Error sending invites");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Invite Friends 🧑‍🤝‍🧑</h2>

      <div className={styles.inputBox}>
        <input
          type="email"
          placeholder="Enter friend's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className={styles.list}>
        {friends.map((friend, index) => (
          <div key={index} className={styles.listItem}>
            <span>{friend}</span>
            <button onClick={() => handleRemove(index)}>❌</button>
          </div>
        ))}
      </div>

      {friends.length > 0 && (
        <button className={styles.inviteBtn} onClick={handleInvite}>
          Invite Friends
        </button>
      )}
    </div>
  );
}

export default Friendinvite;