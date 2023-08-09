import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUsers } from "../../../Api/serverAPI";
import { Box, Divider, styled } from "@material-ui/core";
import Conversation from "./Conversation";
import { useAuth } from "../../../contex/auth";

const Component = styled(Box)`
  overflow: overlay;
  height: 81vh;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const {
    auth,
    setAuth,
    socket,
    setActiveUsers,
    users,
    setUsers,
    newMessageFlag,
    showLastConversations,
  } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsers(auth?.user?._id);
        const filteredData = data.filter((user) =>
          user.UserName.toLowerCase().includes(text.toLowerCase())
        );
        showLastConversations
          ? setUsers(filteredData.splice(0, 20))
          : setUsers(filteredData);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [text, auth?.user]);

  useEffect(() => {
    socket.current.emit("addUsers", auth?.user);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [auth]);

  return (
    <Component>
      {users.map(
        (user) =>
          user?.username !== auth?.user?.username && (
            <>
              <Conversation
                user={user}
                key={user?._id}
                isSelected={selectedUserId === user?._id}
                onSelect={() => setSelectedUserId(user?._id)}
              />
              <StyledDivider />
            </>
          )
      )}
    </Component>
  );
};

export default Conversations;
