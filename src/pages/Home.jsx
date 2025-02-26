import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="bg-gray-400 h-screen flex justify-center items-center">
      <div className="flex border w-full h-full overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
