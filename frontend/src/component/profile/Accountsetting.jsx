import React from "react";
import Profilecard from "./Profilecard";

function Accountsetting() {
  return (
    <Profilecard title="Account Settings" icon="⚙️">
      <p>Edit Profile</p>
      <p>Change Password</p>
      <p>Manage Address</p>
      <p>Notification Preferences</p>
    </Profilecard>
  );
}

export default Accountsetting;