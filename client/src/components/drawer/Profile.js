import {
  Box,
  Button,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAuth } from "../../contex/auth";
import { defaultProfilePicture } from "../../constants/data";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { updateUser } from "../../Api/serverAPI";
import { toast } from "react-hot-toast";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  padding: "25px 0",
});

const BoxWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 30px 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const TypographyWrapper = styled(Box)`
  & :first-child {
    font-size: 13px;
    color: #009688;
    font-weight: 200;
  }
  & :last-child {
    margin: 14px 0;
    color: #4a4a4a;
  }
`;

const DescriptionContainer = styled(Box)`
  padding: 15px 20px 28px 30px;
  & > p {
    color: #8696a0;
    font-size: 13px;
  }
`;

const Profile = () => {
  const { auth, setAuth, setPerson } = useAuth();
  const [showEditImageUrl, setShowEditImageUrl] = useState(false);
  const [showEditUserName, setShowEditUserName] = useState(false);
  const [showEditFullName, setShowEditFullName] = useState(false);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  const [user, setUser] = useState({
    UserName: auth?.user?.username,
    FirstName: auth?.user?.firstName,
    LastName: auth?.user?.lastName,
    Password: "",
    profilePic: auth?.user?.profilePic,
    status: auth?.user?.status,
  });

  const handleSubmit = async () => {
    try {
      const { data } = await updateUser(auth?.user?._id, { updatedUser: user });
      const updatedUser = data.user;
      const updatedAuth = {
        ...auth,
        user: updatedUser,
      };

      setAuth(updatedAuth);
      const currentAuthData = JSON.parse(localStorage.getItem("auth"));
      currentAuthData.user = updatedUser;
      localStorage.setItem("auth", JSON.stringify(currentAuthData));
      setPerson({});

      toast.success(`Profile  updated successfully`);
    } catch (error) {
      toast.error(error);
    }
  };

  const showEditImageUrlHandler = () => {
    setShowEditImageUrl((prev) => !prev);
  };
  const showEditUsernameHandler = () => {
    setShowEditUserName((prev) => !prev);
  };
  const showEditFullNameHandler = () => {
    setShowEditFullName((prev) => !prev);
  };
  const showEditStatusHandler = () => {
    setShowEditStatus((prev) => !prev);
  };
  const showEditPasswordHandler = () => {
    setShowEditPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  console.log(user);

  return (
    <>
      <Tooltip title="Click to update picture">
        <ImageContainer onClick={showEditImageUrlHandler}>
          <Image
            src={user?.profilePic || defaultProfilePicture}
            alt="displaypicture"
          />
        </ImageContainer>
      </Tooltip>

      {showEditImageUrl && (
        <Box style={{ padding: "10px" }}>
          <TextField
            fullWidth
            name="profilePic"
            label="profilePic - Enter image url"
            variant="outlined"
            value={user.profilePic}
            onChange={handleInputChange}
          />
        </Box>
      )}
      <br />

      <BoxWrapper>
        <TypographyWrapper>
          <Typography>Username</Typography>
          <Typography>{auth?.user?.username}</Typography>
        </TypographyWrapper>
        <EditIcon
          onClick={showEditUsernameHandler}
          style={{ cursor: "pointer" }}
        />
      </BoxWrapper>
      {showEditUserName && (
        <Box style={{ padding: "10px" }}>
          <TextField
            fullWidth
            name="UserName"
            label="Username"
            variant="outlined"
            value={user.UserName}
            onChange={handleInputChange}
          />
        </Box>
      )}

      <BoxWrapper>
        <TypographyWrapper>
          <Typography>Full Name</Typography>
          <Typography>
            {auth?.user?.firstName} {auth?.user?.lastName}
          </Typography>
        </TypographyWrapper>
        <EditIcon
          onClick={showEditFullNameHandler}
          style={{ cursor: "pointer" }}
        />
      </BoxWrapper>
      {showEditFullName && (
        <Box style={{ padding: "10px" }}>
          <TextField
            fullWidth
            name="FirstName"
            label="FirstName"
            variant="outlined"
            value={user.FirstName}
            onChange={handleInputChange}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            name="LastName"
            label="LastName"
            variant="outlined"
            value={user.LastName}
            onChange={handleInputChange}
          />
        </Box>
      )}
      <BoxWrapper>
        <TypographyWrapper>
          <Typography>Edit Password</Typography>
        </TypographyWrapper>

        <EditIcon
          onClick={showEditPasswordHandler}
          style={{ cursor: "pointer" }}
        />
      </BoxWrapper>

      {showEditPassword && (
        <Box style={{ padding: "10px" }}>
          <TextField
            fullWidth
            name="Password"
            label="Password"
            variant="outlined"
            value={user.Password}
            onChange={handleInputChange}
          />
        </Box>
      )}

      <DescriptionContainer>
        <Typography>
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <TypographyWrapper>
          <Typography>Status</Typography>
          <Typography>{auth?.user?.status}</Typography>
        </TypographyWrapper>
        <EditIcon
          onClick={showEditStatusHandler}
          style={{ cursor: "pointer" }}
        />
      </BoxWrapper>
      {showEditStatus && (
        <Box style={{ padding: "10px" }}>
          <TextField
            fullWidth
            name="status"
            label="status"
            variant="outlined"
            value={user.status}
            onChange={handleInputChange}
            style={{ marginBottom: "20px" }}
          />
        </Box>
      )}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#46c556", color: "white", width: "420px" }}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Box>
    </>
  );
};

export default Profile;
