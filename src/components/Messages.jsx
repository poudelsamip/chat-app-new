import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => unSub();
  }, [data.chatId]);

  return (
    <div className="flex-grow bg-blue-300 h-auto overflow-y-auto p-2">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      {data.chatId === "null" && <div>Please select user to send message</div>}
    </div>
  );
};

export default Messages;
