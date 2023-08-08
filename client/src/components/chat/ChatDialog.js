import { Dialog, Box } from "@mui/material";

import ChatLayout from "../ChatLayout";
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import styled from "@emotion/styled";
import { useAuth } from "../../contex/auth";

const Component = styled(Box)`
  display: flex;
  width: 100%; // Take up the full width of its parent
  height: 100%; // Take up the full height of its parent
`;

const LeftComponent = styled(Box)`
  flex: 0 0 450px; // flex-grow: 0, flex-shrink: 0, flex-basis: 450px
`;

const RightComponent = styled(Box)`
  flex: 1; // Take up all remaining space
  border-left: 1px solid rgba(0, 0, 0, 0.14);
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
};

const ChatDialog = () => {
  const { person, group } = useAuth();

  return (
    <ChatLayout>
      <Dialog
        open={true}
        BackdropProps={{ style: { backgroundColor: "unset" } }}
        PaperProps={{ sx: dialogStyle }}
        maxWidth={"md"}
      >
        <Component>
          <LeftComponent>
            <Menu />
          </LeftComponent>

          <RightComponent>
            {Object.keys(person).length || Object.keys(group).length ? (
              <ChatBox />
            ) : (
              <EmptyChat />
            )}
          </RightComponent>
        </Component>
      </Dialog>
    </ChatLayout>
  );
};

export default ChatDialog;
