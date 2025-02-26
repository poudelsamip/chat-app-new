import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthProvider } from "../context/MainProvider";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");

  const { currUser } = useContext(AuthProvider);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currUser.uid,
          date: Timestamp.now(),
        }),
      });
    } catch (err) {
      alert(err);
    }

    await updateDoc(doc(db, "userChats", currUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  return (
    <>
      {data.chatId !== "null" && (
        <div className="bg-white h-[50px] px-5 flex items-center justify-between ">
          <input
            type="text"
            placeholder="Write your message"
            className="w-full outline-0"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button
            className="border border-black px-3 py-1 bg-blue-600 text-white font-semibold cursor-pointer hover:bg-blue-800"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
