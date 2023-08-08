import React from "react";
import ChatLayout from "../components/ChatLayout";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  styled,
} from "@material-ui/core";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

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

const AccountPrivacy = () => {
  const navigate = useNavigate();
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
        <DialogTitle>
          <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center" }}
          >
            AccountPrivacy
          </Typography>
        </DialogTitle>
        <List>
          <ListItem button>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText
              primary="BlockedUsers"
              //   secondary="Block Users"
              onClick={() => navigate("/blockedUsers")}
            />
          </ListItem>
        </List>
      </Dialog>
    </ChatLayout>
  );
};

export default AccountPrivacy;
