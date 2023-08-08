import React, { useState } from "react";
import { MoreVert } from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";
import { useAuth } from "../../../contex/auth";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const HeaderMenu = ({ setOpenDrawer, setOpenDrawerSettings }) => {
  const [open, setOpen] = useState(false);
  const { auth, socket, setAuth, setActiveUsers } = useAuth();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(null);
  };

  const handleCloseSettings = () => {
    setOpenDrawerSettings(null);
  };

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  return (
    <>
      <MoreVert style={{ cursor: "pointer" }} onClick={handleClick} />
      <Menu
        anchorEl={open}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/createGroup");
          }}
        >
          <GroupAddIcon />
          Create New Group
        </MenuItem>
        <MenuItem
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleClose();
            setOpenDrawer(true);
          }}
        >
          <PersonIcon />
          Profile
        </MenuItem>

        <MenuItem
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/settings");
          }}
        >
          <SettingsIcon />
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            socket.current.emit("removeUsers", auth?.user?._id);
            socket.current.on("getUsers", (users) => {
              setActiveUsers(users);
            });
            setAuth(null);
            localStorage.removeItem("auth");
            navigate("/");
          }}
        >
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderMenu;
