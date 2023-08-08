import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getGroups } from "../../../Api/serverAPI";
import { Box, Divider, styled } from "@material-ui/core";
import Group from "../menu/Group";
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

const Groups = ({ text }) => {
  const [groups, setGroups] = useState([]);
  const { auth, setAuth, socket, setActiveUsers } = useAuth();
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getGroups(auth?.user?._id);

        const filteredData = data?.groups?.filter((group) =>
          group?.name?.toLowerCase().includes(text?.toLowerCase())
        );
        setGroups(filteredData);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [text]);

  return (
    <Component>
      {groups.map((group) => (
        <>
          <Group
            group={group}
            key={group?._id}
            isSelected={selectedGroupId === group?._id}
            onSelect={() => setSelectedGroupId(group?._id)}
          />
          <StyledDivider />
        </>
      ))}
    </Component>
  );
};

export default Groups;
