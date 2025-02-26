import React, { useContext } from "react";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <>
      <div className="flex-4 flex flex-col justify-between">
        <div
          className={`h-[50px] ${
            data.chatId !== "null" ? "bg-purple-900" : "bg-blue-300"
          }  flex items-center justify-between px-5 text-white`}
        >
          <span className="text-2xl font-semibold">
            {data.user?.displayName}
          </span>
          {data.chatId !== "null" && (
            <div className="flex gap-4 ">
              <IoIosCall size={25} className="cursor-pointer" />
              <FaVideo size={25} className="cursor-pointer" />
              <BsThreeDotsVertical size={25} className="cursor-pointer" />
            </div>
          )}
        </div>

        <Messages />
        <Input />
      </div>
    </>
  );
};

export default Chat;
