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

import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useAuth } from "../contex/auth";
import { getUnblockedUsers } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import UnblockedUser from "../components/UnblockedUser";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css"; // Import the scrollbar styles

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

const AddUsersToBlock = () => {
  const [unblockedUsers, setUnblockedUsers] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnblockedUsers = async () => {
      try {
        const { data } = await getUnblockedUsers(auth?.user?._id);
        setUnblockedUsers(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchUnblockedUsers();
  }, []);

  return (
    <ChatLayout>
      <Dialog
        open={true}
        BackdropProps={{ style: { backgroundColor: "unset" } }}
        PaperProps={{ style: dialogStyle }}
        maxWidth={"md"}
      >
        <PerfectScrollbar
          component="div"
          style={{
            overflow: "hidden",
            width: "100%",
          }}
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
                Choose Users To Block
              </Typography>
            </DialogTitle>
          </Box>

          <List>
            {unblockedUsers.length > 0 ? (
              unblockedUsers.map((user) => (
                <UnblockedUser key={user._id} user={user} />
              ))
            ) : (
              <Typography variant="body1">
                No unblocked users were found.
              </Typography>
            )}
          </List>
        </PerfectScrollbar>
      </Dialog>
    </ChatLayout>
  );
};

export default AddUsersToBlock;
