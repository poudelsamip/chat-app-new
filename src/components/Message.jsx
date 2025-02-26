import React, { useContext, useState } from "react";
import { AuthProvider } from "../context/MainProvider";
import { ChatContext } from "../context/ChatContext";
import man from "../assets/man.jpeg";
import man2 from "../assets/man2.jpeg";

const Message = ({ message }) => {
  const { currUser } = useContext(AuthProvider);
  const { data } = useContext(ChatContext);

  return (
    <>
      <div
        className={`flex  gap-4 mt-3 ${
          message.senderId == currUser.uid ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex flex-col min-h-full justify-between">
          <img
            src={
              // message.senderId == currUser.uid
              //   ? currUser.photoURL
              //   : data.user.photoURL

              // Image hardcoded due to error
              message.senderId == currUser.uid ? man : man2
            }
            alt=""
            className="h-[40px] w-[40px] rounded-full object-cover"
          />
        </div>
        <div className="max-w-[60%]">
          <p className="text-xl font-semibold bg-white p-1">{message.text}</p>
          <p
            className={`text-gray-500 font-semibold p-1 ${
              message.senderId == currUser.uid ? "text-right" : "text-left"
            }`}
          >
            just now
          </p>
        </div>
      </div>
    </>
  );
};

export default Message;
