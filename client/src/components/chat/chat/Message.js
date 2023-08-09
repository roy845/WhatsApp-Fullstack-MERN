import { Box, Typography } from "@mui/material";
import React from "react";
import { formatDate } from "../../../utils/common-utils";
import { useAuth } from "../../../contex/auth";
import styled from "@emotion/styled";
import { getUserColor } from "../../../utils/common-utils";

const Wrapper = styled(Box)`
  background: #ffffff;
  padding: 5px;
  max-width: 60%;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  background-color: ${({ color }) => color || "#ffffff"};
  color: white;
`;

const Own = styled(Box)`
  background: #dcf8c6;
  padding: 5px;
  max-width: 60%;
  width: fit-content;
  margin-left: auto;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  background-color: ${({ color }) => color || "#dcf8c6"};
  color: white;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
  color: white;
`;

const SenderName = styled(Typography)`
  font-size: 12px;
  color: #919191;
  margin-bottom: 5px;
  color: white;
`;

const Message = ({ message }) => {
  const { auth } = useAuth();
  const color = getUserColor(message?.senderId);

  return (
    <>
      {auth?.user?._id === message?.senderId ? (
        <Own color={color}>
          <Text>{message?.text}</Text>
          <Time>{formatDate(message?.createdAt)}</Time>
        </Own>
      ) : (
        <Wrapper color={color}>
          <SenderName>
            {message?.senderName} {message?.senderName && ":"}
          </SenderName>
          <Text>{message?.text}</Text>
          <Time>{formatDate(message?.createdAt)}</Time>
        </Wrapper>
      )}
    </>
  );
};

export default Message;
