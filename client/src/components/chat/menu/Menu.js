import { Box, Tabs, Tab } from "@material-ui/core";
import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Conversations from "./Conversations";
import Groups from "./Groups";
import { useAuth } from "../../../contex/auth";
import { Divider } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css"; // Import the scrollbar styles

const Menu = () => {
  const [text, setText] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const { setPerson, setGroup, users } = useAuth();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setGroup({});
    }

    if (newValue === 1) {
      setPerson({});
    }
  };

  return (
    <PerfectScrollbar
      component="div"
      style={{
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box>
        <Header />
        <Search setText={setText} />
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Conversations" />
          <Tab label="Groups" />
        </Tabs>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {users.length} users
        </div>
        <Divider />

        {selectedTab === 0 && <Conversations text={text} />}
        {selectedTab === 1 && <Groups text={text} />}
      </Box>
    </PerfectScrollbar>
  );
};

export default Menu;
