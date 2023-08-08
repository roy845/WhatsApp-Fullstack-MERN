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
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import { Search } from "@material-ui/icons";
import CloseIcon from "@mui/icons-material/Close";
import { createGroup, getUsers } from "../Api/serverAPI";
import { useAuth } from "../contex/auth";
import { toast } from "react-hot-toast";
import { defaultProfilePicture } from "../constants/data";

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

const CreateGroup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [usersToAdd, setUsersToAdd] = useState([
    {
      UserName: auth?.user?.username,
      profilePic: auth?.user?.profilePic,
      _id: auth?.user?._id,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsers(auth?.user?._id);
        const filteredData = data.filter((user) =>
          user.UserName.toLowerCase().includes(search.toLowerCase())
        );
        setMembers(filteredData);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [search, auth?.user]);

  const handleNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddUser = (user) => {
    if (usersToAdd.some((u) => u._id === user._id)) {
      setUsersToAdd((prev) => prev.filter((u) => u._id !== user._id));
    } else {
      setUsersToAdd((prev) => [...prev, user]);
    }
  };

  const handleRemoveUser = (userId) => {
    setUsersToAdd((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleCreateGroup = async () => {
    try {
      await createGroup(groupName, usersToAdd);
      toast.success("Group created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  console.log(usersToAdd);

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
            New Group
          </Typography>
        </DialogTitle>
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
            </Grid>
          </Grid>
        </List>
        {/* Users list */}
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Select Users
        </Typography>
        <List style={{ textAlign: "center" }}>
          {members
            ?.filter((member) => !usersToAdd.some((u) => u._id === member._id))
            .map((user) => (
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

        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Selected Users
        </Typography>
        <Box display="flex" flexWrap="wrap" mt={2} mb={2}>
          {usersToAdd.map((user) => (
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
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ backgroundColor: "#46c556", color: "white" }}
            disabled={!groupName}
            endIcon={<CreateIcon />}
            onClick={handleCreateGroup}
          >
            Create
          </Button>
        </Box>
      </Dialog>
    </ChatLayout>
  );
};

export default CreateGroup;
