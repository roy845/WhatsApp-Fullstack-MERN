import { styled, Box, Typography, Tooltip } from "@mui/material";
import { defaultProfilePicture } from "../constants/data";
import { toast } from "react-hot-toast";
import { unBlockUser } from "../Api/serverAPI";
import { useAuth } from "../contex/auth";
import { useState } from "react";

const Component = styled(Box)`
  height: 45px;
  display: flex;
  align-items: center;
  padding: 13px 0;
  cursor: pointer;
  background-color: "white";
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: "50%",
  padding: "0 14px",
});

const Container = styled(Box)`
  display: flex;
`;

const BlockedUser = ({ user }) => {
  const imageUrl = user?.profilePic || defaultProfilePicture;
  const { auth } = useAuth();

  const [isUnBlocked, setIsUnBlocked] = useState(false);

  const unBlockUserHandler = async () => {
    try {
      unBlockUser(auth?.user?._id, user?._id);
      setIsUnBlocked(true);
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  if (isUnBlocked) {
    return null; // Don't render the user in the list after blocking.
  }

  return (
    <Component onClick={unBlockUserHandler}>
      <Box>
        <Image src={imageUrl} alt="display picture" />
      </Box>
      <Box style={{ width: "100%" }}>
        <Container>
          <Tooltip title="Click To Unblock">
            <Typography>{user?.UserName}</Typography>
          </Tooltip>
        </Container>
      </Box>
    </Component>
  );
};

export default BlockedUser;
