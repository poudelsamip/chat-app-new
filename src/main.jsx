import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MainProvider from "./context/MainProvider.jsx";
import ChatContextProvider from "./context/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatContextProvider>
    </MainProvider>
  </StrictMode>
);
