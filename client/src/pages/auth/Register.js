import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/cursorStyles.css";
import "../../styles/errorStyles.css";
import "../../styles/successStyles.css";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Typography,
  Dialog,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import toast from "react-hot-toast";
import { register } from "../../Api/serverAPI";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LoginLayout from "../../components/LoginLayout";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#5ad066",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    width: "420px",
    margin: theme.spacing(3, 0, 2),
  },
  blackBorder: {
    width: "420px",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46c556",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46c556",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46c556",
    },
  },
}));

const dialogStyle = {
  marginBottom: "12%",
  marginTop: "12%",
  height: "90%",
  width: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

const Register = () => {
  const classes = useStyles();
  const [UserName, setUsername] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    const inputUserName = e.target.value;
    setUsername(inputUserName);
  };
  const handleFirstNameChange = (e) => {
    const inputFirstName = e.target.value;
    setFirstName(inputFirstName);
  };
  const handleLastNameChange = (e) => {
    const inputLastName = e.target.value;
    setLastName(inputLastName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!UserName || !Password) {
      toast.error("Invalid Entry");
    }

    try {
      const response = await register(FirstName, LastName, UserName, Password);

      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/");
      }

      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      if (!err || !err.response) {
        toast.error("No Server Response");
      } else if (err?.response?.status === 409) {
        toast.error("Username Already exists");
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  return (
    <LoginLayout title={"Register"}>
      <Dialog
        open={true}
        BackdropProps={{ style: { backgroundColor: "unset" } }}
        maxWidth={"md"}
        PaperProps={{ style: dialogStyle }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <WhatsAppIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                value={UserName}
                onChange={handleUsernameChange}
                className={classes.blackBorder}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                value={FirstName}
                onChange={handleFirstNameChange}
                className={classes.blackBorder}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                value={LastName}
                onChange={handleLastNameChange}
                className={classes.blackBorder}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={Password}
                onChange={handlePasswordChange}
                className={classes.blackBorder}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!UserName || !Password || !FirstName || !LastName}
                style={{ backgroundColor: "#46c556", color: "white" }}
                endIcon={<PersonAddIcon />}
              >
                Sign Up
              </Button>

              <Link
                onClick={() => navigate("/")}
                className="link-cursor"
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </Dialog>
    </LoginLayout>
  );
};

export default Register;
