import React, { useEffect, useState } from "react";
import ChatLayout from "../components/ChatLayout";
import {
  Box,
  Dialog,
  DialogTitle,
  List,
  Typography,
  styled,
} from "@material-ui/core";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getBlockedUsers } from "../Api/serverAPI";
import BlockedUser from "../components/BlockedUser";
import { useAuth } from "../contex/auth";

const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
`;

const dialogStyle = {
  height: "95%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
  backgroundColor: "#fafafa",
};

const BlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const { data } = await getBlockedUsers(auth?.user?._id);
        setBlockedUsers(data);
      } catch (error) {}
    };
    fetchBlockedUsers();
  }, []);

  return (
    <ChatLayout>
      <Dialog
        open={true}
        BackdropProps={{ style: { backgroundColor: "unset" } }}
        PaperProps={{ style: dialogStyle }}
        maxWidth={"md"}
      >
        <Header>
          {" "}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <ArrowBack
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Header>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ cursor: "pointer" }}
        >
          <DialogTitle>
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: "center" }}
            >
              BlockedUsers
            </Typography>
          </DialogTitle>
          <PersonAddIcon
            style={{ marginLeft: "20px" }}
            onClick={() => navigate("/addUsersToBlock")}
          />
        </Box>

        <List>
          {blockedUsers.length > 0 ? (
            blockedUsers.map((user) => (
              <BlockedUser key={user._id} user={user} />
            ))
          ) : (
            <Typography variant="body1">
              No blocked users were found.
            </Typography>
          )}
        </List>
      </Dialog>
    </ChatLayout>
  );
};

export default BlockedUsers;
