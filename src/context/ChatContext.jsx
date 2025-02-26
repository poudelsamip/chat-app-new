import React, { createContext, useContext, useReducer } from "react";
import { AuthProvider } from "./MainProvider";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { currUser } = useContext(AuthProvider);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currUser.uid > action.payload.uid
              ? currUser.uid + action.payload.uid
              : action.payload.uid + currUser.uid,
        };
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
