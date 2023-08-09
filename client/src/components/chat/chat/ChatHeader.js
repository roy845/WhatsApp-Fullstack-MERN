import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { MoreVert, Search } from "@material-ui/icons";
import {
  defaultGroupPicture,
  defaultProfilePicture,
} from "../../../constants/data";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contex/auth";

const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  display: flex;
  padding: 1px 16px;
  align-items: center;
`;

const Image = styled("img")({
  width: 40,
  height: 40,
  objectFit: "cover",
  borderRadius: "50%",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 22px;
    color: #000;
  }
`;

const Status = styled(Typography)`
  font-size: 12px !important;
  color: rgb(0, 0, 0, 0.6);
  margin-left: 12px !important;
`;

const ChatHeader = ({ person, group }) => {
  const { activeUsers } = useAuth(); // Move this to the top
  const navigate = useNavigate();
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  let imageUrl;
  let statusText;

  if (person && !isEmptyObject(person)) {
    imageUrl = person.profilePic || defaultProfilePicture;
    const isActiveUser = activeUsers?.find(
      (activeUser) => activeUser?._id === person?._id
    );
    statusText = isActiveUser ? "Online" : "Offline";
  } else if (group && !isEmptyObject(group)) {
    imageUrl = group.profilePic || defaultGroupPicture;
    statusText = group.members.map((member) => member.UserName).join(", ");
  }

  return (
    <Header>
      <Image
        src={imageUrl}
        alt="dp"
        style={{
          cursor: group && !isEmptyObject(group) ? "pointer" : "default",
        }}
        onClick={() => {
          if (group && !isEmptyObject(group)) {
            navigate(`/${"updateGroup"}/${group?._id}`);
          }
        }}
      />
      <Box
        style={{
          cursor: group && !isEmptyObject(group) ? "pointer" : "default",
        }}
        onClick={() => {
          if (group && !isEmptyObject(group)) {
            navigate(`/${"updateGroup"}/${group?._id}`);
          }
        }}
      >
        <Name>{person?.UserName || group?.name}</Name>
        <Status>{statusText}</Status>
      </Box>
      <RightContainer>
        <Search />
        <MoreVert />
      </RightContainer>
    </Header>
  );
};

export default ChatHeader;
