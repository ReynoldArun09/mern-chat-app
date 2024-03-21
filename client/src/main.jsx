import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { MessageContextProvider } from "./context/ConversationContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessageContextProvider>
        <SocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SocketContextProvider>
      </MessageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);