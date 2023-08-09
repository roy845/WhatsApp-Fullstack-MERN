import React, { useEffect, useState } from "react";
import ChatLayout from "../components/ChatLayout";
import {
  Dialog,
  DialogTitle,
  List,
  Typography,
  Box,
  styled,
  makeStyles,
  TextField,
  Button,
  Grid,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Chip,
  Tooltip,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css"; // Import the scrollbar styles

import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import UpdateIcon from "@material-ui/icons/Update";
import { Search } from "@material-ui/icons";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteGroup,
  getGroup,
  getUsersNotInGroup,
  leaveGroup,
  updateGroup,
} from "../Api/serverAPI";
import { useAuth } from "../contex/auth";
import { toast } from "react-hot-toast";
import { defaultGroupPicture, defaultProfilePicture } from "../constants/data";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#5ad066",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    width: "420px",
    margin: theme.spacing(3, 0, 2),
  },
  blackBorder: {
    width: "420px",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46c556",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46c556",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46c556",
    },
  },
}));

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

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  padding: "25px 0",
});

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

const UpdateGroup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { auth } = useAuth();

  const [groupName, setGroupName] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [usersNotInGroup, setUsersNotInGroup] = useState([]);
  const [group, setGroup] = useState({});
  const [filteredUsersNotInGroup, setFilteredUsersNotInGroup] = useState([]);
  const [showProfilePicEdit, setShowProfilePicEdit] = useState(false);
  const [showUpdateGroup, setShowUpdateGroup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsersNotInGroup(groupId);
        setUsersNotInGroup(data.users);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [groupId]);

  useEffect(() => {
    setFilteredUsersNotInGroup(
      usersNotInGroup.filter((user) =>
        user.UserName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, usersNotInGroup]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const { data } = await getGroup(groupId);
        setGroupName(data.group.name);
        setGroup(data.group);
        setMembers(data.group.members);
        setProfilePic(data.group.profilePic);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchGroup();
  }, []);

  const handleNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddUser = (user) => {
    setMembers((prev) => [...prev, user]);

    setUsersNotInGroup((prev) => prev.filter((u) => u._id !== user._id));
  };

  const handleRemoveUser = (userId) => {
    const userToRemove = members.find((user) => user._id === userId);

    setMembers((prev) => prev.filter((user) => user._id !== userId));

    if (userToRemove) {
      setUsersNotInGroup((prev) => [...prev, userToRemove]);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      await updateGroup(groupId, groupName, profilePic, members);
      navigate("/");
      toast.success("Group updated successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(groupId);
      navigate("/");
      toast.success("Group deleted successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(groupId, auth?.user?._id);
      navigate("/");
      toast.success("User has left the group");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ChatLayout>
      <Dialog
        open={true}
        BackdropProps={{
          style: {
            backgroundColor: "unset",
          },
        }}
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
              Update Group
            </Typography>
          </DialogTitle>
          <ImageContainer
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfilePicEdit((prev) => !prev)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Tooltip title={"Click to update image profile"}>
                <Image
                  src={profilePic || group?.profilePic || defaultGroupPicture}
                  alt="displaypicture"
                />
              </Tooltip>

              <p>Group {members?.length} participants</p>
              <p>Group created by {group?.creator?.UserName}</p>
            </div>
          </ImageContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {auth?.user?._id === group?.creator?._id && (
              <Tooltip title={"Click to add/remove users"}>
                <GroupAddIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowUpdateGroup((prev) => !prev)}
                />
              </Tooltip>
            )}
          </div>
          {showProfilePicEdit && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                id="profilePic"
                label="profile Picture"
                name="profilePic"
                autoComplete="profilePic"
                autoFocus
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                className={classes.blackBorder}
              />
            </div>
          )}

          <List style={{ textAlign: "center" }}>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="name"
                  label="Group Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={groupName}
                  onChange={handleNameChange}
                  className={classes.blackBorder}
                />
              </Grid>
              <Grid item xs={12}>
                {auth?.user?._id === group?.creator?._id && showUpdateGroup && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="search"
                    label="Search users"
                    name="search"
                    autoComplete="search"
                    autoFocus
                    value={search}
                    onChange={handleSearchChange}
                    className={classes.blackBorder}
                  />
                )}
              </Grid>
            </Grid>
          </List>
          {/* Users list */}
          {auth?.user?._id === group?.creator?._id && showUpdateGroup && (
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              Select Users
            </Typography>
          )}
          {auth?.user?._id === group?.creator?._id && showUpdateGroup && (
            <List style={{ textAlign: "center" }}>
              {filteredUsersNotInGroup.map((user) => (
                <ListItem
                  key={user._id}
                  button
                  onClick={() => handleAddUser(user)}
                  alignItems="center"
                >
                  <ListItemAvatar>
                    <Avatar src={user.profilePic || defaultProfilePicture} />
                  </ListItemAvatar>
                  <ListItemText primary={user.UserName} />
                </ListItem>
              ))}
            </List>
          )}

          {auth?.user?._id === group?.creator?._id && showUpdateGroup && (
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              Selected Users
            </Typography>
          )}
          {auth?.user?._id === group?.creator?._id && showUpdateGroup && (
            <Box display="flex" flexWrap="wrap" mt={2} mb={2}>
              {members.map((user) => (
                <Box key={user._id} m={1}>
                  <Chip
                    avatar={
                      <Avatar src={user.profilePic || defaultProfilePicture} />
                    }
                    label={user.UserName}
                    onDelete={() => handleRemoveUser(user._id)}
                    deleteIcon={<CloseIcon />}
                  />
                </Box>
              ))}
            </Box>
          )}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{
                backgroundColor: "#46c556",
                color: "white",
                marginBottom: "15px",
              }}
              disabled={!groupName}
              endIcon={<UpdateIcon />}
              onClick={handleUpdateGroup}
            >
              Update
            </Button>
            {auth?.user?._id === group?.creator?._id && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginBottom: "15px",
                }}
                endIcon={<DeleteIcon />}
                onClick={handleDeleteGroup}
              >
                Delete
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ backgroundColor: "red", color: "white" }}
              endIcon={<ExitToAppIcon />}
              onClick={handleLeaveGroup}
            >
              Leave Group
            </Button>
          </Box>
        </PerfectScrollbar>
      </Dialog>
    </ChatLayout>
  );
};

export default UpdateGroup;
