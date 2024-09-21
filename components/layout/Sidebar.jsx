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
      >
        8279373572
      </div>
      <div
        onClick={() => {
          props.setReciever("8279373573");
        }}
      >
        8279373573
      </div>
    </div>
  );
}

export default Sidebar;
