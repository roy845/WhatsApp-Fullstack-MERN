import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useAuth } from "../../../contex/auth";
import { getConversation, getGroupConversation } from "../../../Api/serverAPI";

const ChatBox = () => {
  const { auth, person, group } = useAuth();

  const [conversation, setConversation] = useState({});

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  useEffect(() => {
    const getConversationDetails = async () => {
      const { data } = await getConversation({
        senderId: auth?.user?._id,
        receiverId: person?._id,
      });
      setConversation(data);
    };

    const getGroupConversationDetails = async () => {
      const { data } = await getGroupConversation({
        senderId: auth?.user?._id,
        receiverIds: group?.members.map((member) => member?._id),
      });
      setConversation(data);
    };

    !isEmptyObject(person) && getConversationDetails();
    !isEmptyObject(group) && getGroupConversationDetails();
  }, [person._id, group._id]);

  return (
    <Box style={{ height: "75%" }}>
      <ChatHeader person={person} group={group} />
      <Messages person={person} group={group} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;
