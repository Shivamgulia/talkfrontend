import React, { useEffect, useRef, useState } from "react";
import MessageForm from "../forms/MessageForm";

import { over } from "stompjs";
import SockJS from "sockjs-client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Delay } from "../util/delay";
import Messages from "./Messages";

function Chat(props) {
  const stompClientRef = new useRef(null);

  const [messageList, setMessageList] = useState(new Map());
  const [currentRecieverMessages, setCurrentRevieverMessages] = useState([]);

  const session = useSession();
  const router = useRouter();

  console.log(typeof currentRecieverMessages);

  const userJoin = () => {
    var chatMessage = {
      senderName: session.data.user.phoneNumber,
      auth: "Bearer " + session.data.accessToken,
      status: "JOIN",
    };
    const res = stompClientRef.current.send(
      "/app/private-message",
      {},
      JSON.stringify(chatMessage)
    );
    console.log("res", res);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      console.log(session.data.user.phoneNumber);
    }
    if (session.status == "unauthenticated") {
      router.push("/login");
    }
  }, [session.status]);

  useEffect(() => {
    if (session.status !== "authenticated") {
      return;
    }

    const client = over(new SockJS("http://localhost:8080/ws"));
    client.connect(
      {},
      () => {
        stompClientRef.current = client;

        console.log("connected");
        client.subscribe(
          "/user/" + session.data.user.phoneNumber + "/private",
          onMessageRecieved
        );

        userJoin();
      },
      (err) => {
        console.log(err);
      }
    );
  }, [session.status]);

  useEffect(() => {
    if (messageList.get(props.reciever)) {
      setCurrentRevieverMessages(messageList.get(props.reciever));
    } else {
      setCurrentRevieverMessages([]);
    }
  }, [props.reciever]);

  useEffect(() => {
    console.log(stompClientRef.current, "stomp client");
  }, [stompClientRef]);

  async function sendMessage(message) {
    if (!props.reciever) {
      return;
    }
    console.log(stompClientRef);
    if (stompClientRef.current) {
      console.log("in");
      var chatMessage = {
        senderName: session.data.user.phoneNumber,
        auth: "Bearer " + session.data.accessToken,
        receiverName: props.reciever,
        message: message,
        status: "MESSAGE",
      };

      console.log(chatMessage);

      // if (userData.username !== tab) {
      //   privateChats.get(tab).push(chatMessage);
      //   setPrivateChats(new Map(privateChats));
      // }
      await stompClientRef.current.send(
        "/app/private-message",
        {},
        JSON.stringify(chatMessage)
      );
      // setUserData({ ...userData, message: "" });
    }

    console.log(chatMessage.receiverName);

    if (!!messageList.get(chatMessage.receiverName)) {
      let messagesMap = messageList;

      let userMessages = messagesMap.get(chatMessage.receiverName);

      userMessages = [...userMessages, chatMessage];

      messagesMap.set(chatMessage.receiverName, userMessages);

      setCurrentRevieverMessages(userMessages);
    } else {
      let temp = messageList;
      temp.set(chatMessage.receiverName, [chatMessage]);
      setMessageList(temp);
      let msgs = currentRecieverMessages;
      msgs = [...msgs, chatMessage];
      setCurrentRevieverMessages(msgs);

      console.log();
    }
  }

  async function onMessageRecieved(payload) {
    var payloadData = await JSON.parse(payload.body);

    console.log(payloadData);

    var chatMessage = {
      senderName: session.data.user.phoneNumber,
      auth: "Bearer " + session.data.accessToken,
      id: payloadData.id,
      status: "RECIPT",
    };

    await stompClientRef.current.send(
      "/app/private-message",
      {},
      JSON.stringify(chatMessage)
    );

    if (!!messageList.get(payloadData.senderName)) {
      let messagesMap = messageList;

      let userMessages = messagesMap.get(payloadData.senderName);

      userMessages = [...userMessages, payloadData];

      messagesMap.set(payloadData.senderName, userMessages);

      setMessageList(messagesMap);

      setCurrentRevieverMessages(userMessages);
    } else {
      let temp = messageList;
      temp.set(payloadData.senderName, [payloadData]);
      setMessageList(temp);
      let msgs = currentRecieverMessages;
      msgs = [...msgs, payloadData];
      setCurrentRevieverMessages(msgs);
    }
  }

  console.log(messageList);
  console.log(currentRecieverMessages);

  return (
    <div>
      <button onClick={signOut}>Logout</button>
      Chat
      <Messages messages={currentRecieverMessages} />
      <MessageForm sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;
