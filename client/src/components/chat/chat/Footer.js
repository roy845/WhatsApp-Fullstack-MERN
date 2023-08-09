import { Box, InputBase } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #ffffff;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
  height: 20px;
  width: 100%;
`;

const ClipIcon = styled(AttachFile)`
  transform: "rotate(40deg)";
`;

const Footer = ({ sendText, setValue, value }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const addEmoji = (e) => {
    let emoji = e.native;
    setValue((prevState) => prevState + emoji);
  };
  return (
    <Container>
      <EmojiEmotionsOutlined
        onClick={() => setIsPickerVisible((prev) => !prev)}
      />
      {isPickerVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "60px", // Adjust this to position the picker just above the footer
            left: "50%",
            transform: "translateX(-50%)", // Centers the picker
            zIndex: 10,
          }}
        >
          <Picker
            data={data}
            onEmojiSelect={(e) => {
              addEmoji(e);
            }}
          />
        </div>
      )}

      <ClipIcon />

      <Search>
        <InputField
          placeholder="Type a message"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value}
        />
      </Search>
      <Mic />
    </Container>
  );
};

export default Footer;
