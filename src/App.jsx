import React, { useContext } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/MainProvider";

function App() {
  const { currUser } = useContext(AuthProvider);
  return (
    <Routes>
      <Route path="/" element={currUser ? <Home /> : <Login />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<p>Error 404 : Page not found</p>} />
    </Routes>
  );
}

export default App;
