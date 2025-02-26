import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../context/MainProvider";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import man2 from "../assets/man2.jpeg";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currUser } = useContext(AuthProvider);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getData = () => {
      const unSub = onSnapshot(doc(db, "userChats", currUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        } else {
          setChats([]);
        }
      });
      return () => unSub();
    };
    currUser?.uid && getData();
  }, [currUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="flex-1">
      {Object.entries(chats)?.map((chat) => (
        <div
          className="cursor-pointer flex items-center gap-2 text-white hover:bg-purple-800 p-2"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img
            // src={chat[1].userInfo?.photoURL}
            // Image hardcoded due to error
            src={man2}
            alt="profile picture"
            className="h-[50px] w-[50px] object-cover rounded-full"
          />
          <div>
            <span className="text-xl font-semibold">
              {chat[1].userInfo?.displayName}
            </span>
            <p className="text-sm">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
