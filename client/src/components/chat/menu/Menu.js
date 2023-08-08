import { Box, Tabs, Tab } from "@material-ui/core";
import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Conversations from "./Conversations";
import Groups from "./Groups";
import { useAuth } from "../../../contex/auth";

const Menu = () => {
  const [text, setText] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const { setPerson, setGroup } = useAuth();

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
      {selectedTab === 0 && <Conversations text={text} />}
      {selectedTab === 1 && <Groups text={text} />}
    </Box>
  );
};

export default Menu;
