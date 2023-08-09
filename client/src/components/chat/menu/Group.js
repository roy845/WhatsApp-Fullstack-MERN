import { styled, Box, Typography } from "@mui/material";
import { defaultGroupPicture } from "../../../constants/data";
import { useAuth } from "../../../contex/auth";
import {
  setGroupConversation,
  getGroupConversation,
} from "../../../Api/serverAPI";
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

const Group = ({ group, isSelected, onSelect }) => {
  const imageUrl = group?.profilePic || defaultGroupPicture;

  const { newMessageFlag, setGroup, setPerson, auth } = useAuth();

  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        const { data } = await getGroupConversation({
          senderId: auth?.user?._id,
          receiverIds: group?.members?.map((member) => member?._id),
        });
        console.log(data);
        setMessage({
          text: data?.message,
          timestamp: data?.updatedAt,
          senderName: data?.sender?.UserName,
        });
      } catch (error) {
        toast.error(error);
      }
    };

    getConversationDetails();
  }, [newMessageFlag, group?._id]);

  const getGroup = async () => {
    setPerson({});
    setGroup(group);

    onSelect(group?._id);
    await setGroupConversation({
      groupId: group?._id,
      senderId: auth?.user?._id,
      receiverIds: group?.members?.map((member) => member?._id),
    });
  };

  return (
    <Component onClick={() => getGroup()} isselected={isSelected}>
      <Box>
        <Image src={imageUrl} alt="display picture" />
      </Box>
      <Box style={{ width: "100%" }}>
        <Container>
          <Typography>{group?.name}</Typography>
          {message?.text && (
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )}
        </Container>
        <Box>
          <Text>
            {message?.senderName}
            {message?.senderName && ":"}
            {message?.text}
          </Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Group;
