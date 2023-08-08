import { Box } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { InputBase } from "@mui/material";
import React from "react";

const Search = ({ setText }) => {
  return (
    <Box
      style={{
        background: "#fff",
        height: "45px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #F2F2F2",
      }}
    >
      <Box
        style={{
          position: "relative",
          borderRadius: "10px",
          backgroundColor: "#f0f2f5",
          margin: "0 13px",
          width: "100%",
        }}
      >
        <Box
          style={{
            color: "#919191",
            padding: "8px",
            height: "100%",
            position: "absolute",
          }}
        >
          <SearchIcon fontSize="small" />
        </Box>
        <InputBase
          placeholder="Search or start new chat"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            paddingLeft: "65px",
            fontSize: "14px",
            height: "15px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Search;
