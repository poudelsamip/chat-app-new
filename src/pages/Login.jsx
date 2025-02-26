import React, { useContext } from "react";
import { AuthProvider } from "../context/MainProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginWithGoogle } = useContext(AuthProvider);

  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithGoogle();
    navigate("/");
  };

  return (
    <div className="bg-white-500 h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-bold">Welcome to Chat App</h1>
        <button
          className="border p-2 bg-white cursor-pointer hover:bg-gray-300"
          onClick={handleLogin}
        >
          <span className="font-semibold">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
