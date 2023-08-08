import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../../contex/auth";
import { Chat as MessageIcon } from "@material-ui/icons";
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";
import { defaultProfilePicture } from "../../../constants/data";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { auth } = useAuth();

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Box
        style={{
          height: "44px",
          background: "#ededed",
          display: "flex",
          padding: "8px 16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
          className="profileContainer"
        >
          <img
            src={auth?.user?.profilePic || defaultProfilePicture}
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              marginRight: "10px", // Add margin to the right side of the image
            }}
            onClick={() => toggleDrawer()}
          />
          {auth?.user?.username}
        </div>
        <Box display="flex" alignItems="center">
          <MessageIcon style={{ cursor: "pointer" }} />
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Box>
      </Box>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
    </>
  );
};

export default Header;
