import React, { useState } from "react";
import styles from "../../styles/invitefriend.module.css";

function Friendinvite() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);

  const handleAdd = () => {
    if (email.trim() === "") return;

    setFriends([...friends, email]);
    setEmail("");
  };

  const handleRemove = (index) => {
    const updated = friends.filter((_, i) => i !== index);
    setFriends(updated);
  };

  const handleInvite = () => {
    console.log("Inviting:", friends);
    alert("Invites sent!");
  };

  return (
    <div className={styles.container}>
      
      <h2 className={styles.heading}>Invite Friends 🧑‍🤝‍🧑</h2>

      {/* Input + Add */}
      <div className={styles.inputBox}>
        <input
          type="email"
          placeholder="Enter friend's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* List */}
      <div className={styles.list}>
        {friends.map((friend, index) => (
          <div key={index} className={styles.listItem}>
            <span>{friend}</span>
            <button onClick={() => handleRemove(index)}>❌</button>
          </div>
        ))}
      </div>

      {/* Invite Button */}
      {friends.length > 0 && (
        <button className={styles.inviteBtn} onClick={handleInvite}>
          Invite Friends
        </button>
      )}

    </div>
  );
}

export default Friendinvite;