import React, { useState } from "react";
import Sidebar from "./Sidebar";

import styles from "@/styles/components/layout/Main.module.css";
import Chat from "../chat/Chat";

function Main() {
  const [reciever, setReciever] = useState("8279373572");

  return (
    <div className={styles.cont}>
      <div className={styles.sidebar}>
        <Sidebar setReciever={setReciever} />
      </div>
      <div className={styles.main}>
        <Chat reciever={reciever} />
      </div>
    </div>
  );
}

export default Main;
