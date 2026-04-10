import React from "react";
import Profileheader from "./Profileheader";
import Personalinfo from "./Personalinfo";
import Accountsetting from "./Accountsetting";
import Profilehelp from "./Profilehelp";
import Logoutbutton from "../buttons/Logoutbutton";
import styles from "../../styles/profile/myprofile.module.css";

function Myprofile() {
  return (
    <div className={styles.container}>
      
      <Profileheader />

      <div className={styles.grid}>
        <Personalinfo />
        <Accountsetting />
        <Profilehelp />
      </div>

      <Logoutbutton />

    </div>
  );
}

export default Myprofile;