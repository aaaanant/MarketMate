import React from "react";
import Profilecard from "./Profilecard";

function Personalinfo() {
  return (
    <Profilecard title="Personal Information" icon="👤">
      <p><strong>Name:</strong> Anant Bhatt</p>
      <p><strong>Email:</strong> anant@email.com</p>
      <p><strong>Phone:</strong> +91 9876543210</p>
      <p><strong>Address:</strong> Dehradun, India</p>
    </Profilecard>
  );
}

export default Personalinfo;