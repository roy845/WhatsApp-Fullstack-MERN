import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useChat } from "../context/ChatProvider";
import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import {
  createNotification,
  getAllMessages,
  removeUsersFromBlockedList,
  sendNewMessage,
} from "../Api/serverAPI";
import "./styles/styles.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { SendIcon } from "../icons/icons";

const ENDPOINT = "http://localhost:8800";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { auth } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setisTyping] = useState(false);
  const { selectedChat, setSelectedChat, notification, setNotification } =
    useChat();
  const [open, setOpen] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPressedSend, setIsPressedSend] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setNewMessage((prevMessage) => prevMessage + emoji);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", auth);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setisTyping(true));
    socket.on("stop typing", () => setisTyping(false));
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await getAllMessages(selectedChat._id);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to get Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (e) => {
    if ((e?.key === "Enter" && newMessage) || isPressedSend) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await sendNewMessage(selectedChat._id, newMessage);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        if (error?.response.status === 403) {
          toast({
            title: error?.response?.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setOpen(true);
        }
        if (error?.response.status === 401) {
          toast({
            title: error?.response?.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
      setIsPressedSend(false);
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //Typing Indicator Logic
    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const createNotificationFunc = async (newMessageReceived) => {
    try {
      console.log(notification);
      const { data } = await createNotification({
        chat: newMessageReceived.chat._id,
        content: newMessageReceived.content,
        sender: newMessageReceived.sender._id,
      });
      return data;
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to create Notification",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    const handleMessageReceived = (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification
        if (!notification.includes(newMessageReceived)) {
          createNotificationFunc(newMessageReceived).then((res) => {
            console.log(res);
            setNotification([res, ...notification]);
          });

          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    };

    socket.on("message received", handleMessageReceived);

    // Cleanup the event listener on component unmount
    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [selectedChatCompare, notification, messages, fetchAgain]);

  const removeUserFromBlock = async () => {
    const userIdToUnblock = selectedChat?.users?.find((user) =>
      user?.blockedUsers?.includes(auth?._id)
    )?._id;

    try {
      const { data } = await removeUsersFromBlockedList([userIdToUnblock]);
      toast({
        title: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(auth, selectedChat.users)}

                <ProfileModal user={getSenderFull(auth, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}

                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            backgroundImage={
              "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"
            }
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            {showEmojiPicker && (
              <Picker
                data={data}
                onEmojiSelect={(e) => {
                  addEmoji(e);
                }}
              />
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Flex>
                <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  🙂
                </Button>
                <Input
                  variant="filled"
                  bg="#ffffff"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  flex="1" // This will make the input take the remaining space
                />

                {newMessage && (
                  <Button
                    onClick={() => {
                      setIsPressedSend(true);
                      sendMessage();
                    }}
                  >
                    <SendIcon />
                  </Button>
                )}
              </Flex>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          background="#f8f9fa"
          padding="30px 0"
          textAlign="center"
          height="100%"
        >
          <Box padding="0 200px">
            <img
              marginTop="100"
              display="block"
              width="100%"
              height="100%"
              objectFit="contain"
              src={
                "https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg"
              }
            />
            <Text
              fontSize="32px"
              fontFamily="inherit"
              fontWeight="300"
              color="#41525d"
              marginTop="25px 0 10px 0"
            >
              WhatsApp Web
            </Text>
            <Text
              fontSize="14px"
              color="#667781"
              fontWeight="400"
              fontFamily="inherit"
            >
              Now send and receive messages without keeping your phone online.
            </Text>
            <Text
              fontSize="14px"
              color="#667781"
              fontWeight="400"
              fontFamily="inherit"
            >
              Use WhatsApp on up to 4 linked devices and 1 phone at the same
              time.
            </Text>
          </Box>
        </Box>
      )}

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Remove User From Block
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This user is blocked, you need to cancel the block of this user in
            order to send him a message
          </ModalBody>

          <ModalFooter>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button colorScheme="blue" onClick={removeUserFromBlock}>
                Cancel Block
              </Button>
              <Button colorScheme="blue" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingleChat;
