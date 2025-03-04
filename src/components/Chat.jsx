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
      <div className="flex-4 flex justify-between">
        <div className="h-full flex flex-col w-full">
          <Messages />
          <Input />
        </div>
        <div
          className={`h-full ${
            data.chatId !== "null" ? "bg-purple-900" : "bg-blue-300"
          }   px-5 text-white w-[250px]`}
        >
          <p className="text-2xl font-semibold mt-2">
            {data.user?.displayName}
          </p>
          {data.chatId !== "null" && (
            <div className="flex justify-between mt-5">
              <IoIosCall size={25} className="cursor-pointer" />
              <FaVideo size={25} className="cursor-pointer" />
              <BsThreeDotsVertical size={25} className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
