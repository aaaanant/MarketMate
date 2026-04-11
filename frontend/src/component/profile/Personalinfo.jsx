import React, { useEffect, useState } from "react";
import Profilecard from "./Profilecard";

function Personalinfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_URL;

        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/api/auth/me`, {
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

  if (!user) return <p>Loading...</p>;

  return (
    <Profilecard title="Personal Information" icon="👤">
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </Profilecard>
  );
}

export default Personalinfo;