import React from "react";

import styles from "@/styles/components/layout/Sidebar.module.css";
import SideHead from "./SideHead";

function Sidebar(props) {
  return (
    <div className={styles.cont}>
      <SideHead />

      <div
        onClick={() => {
          props.setReciever("8279373572");
        }}
        className={styles.chat}
      >
        <img src="" alt="photo" className={styles.profilephoto} />
        <h3 className={styles.id}>8279373572</h3>
      </div>
      <div
        onClick={() => {
          props.setReciever("8279373573");
        }}
        className={styles.chat}
      >
        <img src="" alt="photo" className={styles.profilephoto} />
        <h3 className={styles.id}>8279373573</h3>
      </div>
    </div>
  );
}

export default Sidebar;
