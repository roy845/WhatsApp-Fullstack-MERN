import { styled, Box, Typography, Badge } from "@mui/material";
import { defaultProfilePicture } from "../../../constants/data";
import { useAuth } from "../../../contex/auth";
import { setConversation, getConversation } from "../../../Api/serverAPI";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
  height: 45px;
  display: flex;
  align-items: center; // added this to vertically align children
  padding: 13px 0;
  cursor: pointer;
  background-color: ${({ isselected }) =>
    isselected ? "#f0f2f5" : "white"}; // Conditional background color
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: "50%",
  padding: "0 14px",
});

const Container = styled(Box)`
  display: flex;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #00000099;
  margin-right: 20px;
`;

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

const Conversation = ({ user, isSelected, onSelect }) => {
  const imageUrl = user?.profilePic || defaultProfilePicture;

  const { setPerson, setGroup, auth, newMessageFlag } = useAuth();

  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        const { data } = await getConversation({
          senderId: auth?.user?._id,
          receiverId: user?._id,
        });

        setMessage({ text: data?.message, timestamp: data?.updatedAt });
      } catch (error) {
        toast.error(error);
      }
    };

    getConversationDetails();
  }, [newMessageFlag, user?._id]);

  const getUser = async () => {
    setGroup({});
    setPerson(user);
    onSelect(user?._id);
    await setConversation({
      senderId: auth?.user?._id,
      receiverId: user?._id,
    });
  };

  return (
    <Component onClick={() => getUser()} isselected={isSelected}>
      <Box>
        <Image src={imageUrl} alt="display picture" />
      </Box>

      <Box style={{ width: "100%" }}>
        <Container>
          <Typography>{user?.UserName}</Typography>

          {message?.text && (
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )}
        </Container>
        <Box>
          <Text>{message?.text}</Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
