import React, { useEffect, useState } from "react";
import Profilecard from "./Profilecard";

const BASE_URL = import.meta.env.VITE_API_URL;

function Personalinfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <Profilecard title="Personal Information" icon="👤">
      <p><strong>Name:</strong> {user.username || "N/A"}</p>
      <p><strong>Email:</strong> {user.email || "N/A"}</p>
      <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
    </Profilecard>
  );
}

export default Personalinfo;