import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { useAuth } from "../../../contex/auth";
import {
  getMessages,
  getMessagesGroup,
  getUsers,
  newMessage,
  newMessageGroup,
} from "../../../Api/serverAPI";
import { toast } from "react-hot-toast";
import Message from "./Message";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const StyledFooter = styled(Box)`
  height: 55px;
  background: #ededed;
  // position: absolute;
  width: 100%;
  // bottom: 0
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ person, group, conversation }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  const { auth, socket, newMessageFlag, setNewMessageFlag, setUsers } =
    useAuth();

  useEffect(() => {
    if (conversation?._id) {
      // Join the conversation room when component mounts
      socket.current.emit("joinRoom", conversation._id);
    }

    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });

    return () => {
      if (conversation?._id) {
        // Leave the conversation room when component unmounts
        socket.current.emit("leaveRoom", conversation._id);
      }
    };
  }, [conversation]);

  useEffect(() => {
    const getMessageDetails = async () => {
      try {
        let { data } = await getMessages(conversation?._id);
        setMessages(data.reverse());
      } catch (error) {
        toast.error(error);
      }
    };

    const getMessageGroupDetails = async () => {
      try {
        let { data } = await getMessagesGroup(conversation?._id);

        setMessages(data.reverse());
      } catch (error) {
        toast.error(error);
      }
    };

    conversation?._id && Object.keys(person).length > 0 && getMessageDetails();
    conversation?._id &&
      Object.keys(group).length > 0 &&
      getMessageGroupDetails();
  }, [person?._id, conversation?._id, group?._id, newMessageFlag]);

  console.log(messages);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => {
        const newMessages = [...prev, incomingMessage];
        // If the total messages exceed 20, chop off the oldest one
        return newMessages.length > 20 ? newMessages.slice(1) : newMessages;
      });
  }, [incomingMessage, conversation]);

  const receiverId = conversation?.members?.find(
    (member) => member !== auth?.user?._id
  );

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    let message;
    if (code === 13) {
      if (Object.keys(person).length > 0) {
        message = {
          senderId: auth?.user?._id,
          senderName: auth?.user?.username,
          receiverId: receiverId,
          conversationId: conversation?._id,
          type: "text",
          text: value,
        };
        socket.current.emit("sendMessage", message);

        await newMessage(message);
      }
      if (Object.keys(group).length > 0) {
        message = {
          senderId: auth?.user?._id,
          senderName: auth?.user?.username,
          receiverIds: group?.members?.map((member) => member?._id),
          conversationId: conversation?._id,
          type: "text",
          text: value,
        };
        socket.current.emit("sendGroupMessage", message);
        await newMessageGroup(message);
      }

      setValue("");

      const { data } = await getUsers(auth?.user?._id);
      setUsers(data);
      setNewMessageFlag((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages?.map((message) => (
          <Container ref={scrollRef}>
            <Message message={message} key={message?._id} />
          </Container>
        ))}
      </Component>
      <Footer sendText={sendText} setValue={setValue} value={value} />
    </Wrapper>
  );
};

export default Messages;
