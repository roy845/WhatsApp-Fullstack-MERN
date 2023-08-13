import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import { useAuth } from "./context/auth";
import RequireAuth from "./components/RequireAuth";

const AppRoutes = () => {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path="/" element={!auth ? <Homepage /> : <ChatPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/chats" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
