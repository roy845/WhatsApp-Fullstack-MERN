import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useAuth } from "./contex/auth";
import ChatDialog from "./components/chat/ChatDialog";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import AccountPrivacy from "./pages/AccountPrivacy";
import BlockedUsers from "./pages/BlockedUsers";
import AddUsersToBlock from "./pages/AddUsersToBlock";
import CreateGroup from "./pages/CreateGroup";
import { getGroups } from "./Api/serverAPI";

const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={!auth ? <Login /> : <ChatDialog />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/accountPrivacy" element={<AccountPrivacy />} />
      <Route path="/blockedUsers" element={<BlockedUsers />} />
      <Route path="/addUsersToBlock" element={<AddUsersToBlock />} />
      <Route path="/createGroup" element={<CreateGroup />} />
      <Route path="/chat" element={<ChatDialog />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
