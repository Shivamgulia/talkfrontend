import React, { useEffect } from "react";

import styles from "@/styles/components/chat/Messages.module.css";
import { useSession } from "next-auth/react";

function Messages(props) {
  const session = useSession();
  useEffect(() => {
    if (session.status == "loading") return <h2>Loading.....</h2>;
  }, [session.status]);
  console.log(props);
  return (
    <div className={styles.cont}>
      {props.messages.map((item, index) => {
        return (
          <div key={index}>
            {session.data.user.phoneNumber == item.senderName ? (
              <div className={styles.message}>
                <h3 className={styles.text}>{item.message}</h3>
                <h2 className={styles.senderName}>{item.senderName} : </h2>
              </div>
            ) : (
              <div className={styles.recievedMessage}>
                <h2 className={styles.senderName}>{item.senderName} : </h2>
                <h3 className={styles.text}>{item.message}</h3>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
