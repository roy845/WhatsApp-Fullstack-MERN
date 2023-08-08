import React, { useState } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contex/auth";
import "../../styles/cursorStyles.css";
import "../../styles/errorStyles.css";
import "../../styles/successStyles.css";
import toast from "react-hot-toast";
import { login } from "../../Api/serverAPI";
import LoginIcon from "@mui/icons-material/Login";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LoginLayout from "../../components/LoginLayout";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

const Login = () => {
  const classes = useStyles();
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const { auth, setAuth, socket, setActiveUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  let from = "/";
  if (location.state && location.state.from && location.state.from.pathname) {
    from = location.state.from.pathname;
  }

  const handleUsernameChange = (e) => {
    const inputUsername = e.target.value;
    setUsername(inputUsername);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!UserName || !Password) {
      toast.error("Fill in all the details");
    }

    try {
      const { data } = await login(UserName, Password);

      toast.success(data?.message);

      setAuth({
        ...auth,
        user: data.user,
        token: data.token,
      });

      const authData = {
        user: data.user,
        token: data.token,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      socket.current.emit("addUsers", data?.user);
      socket.current.on("getUsers", (users) => {
        setActiveUsers(users);
      });
      navigate(from, { replace: true });

      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      if (!err || !err.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err?.response?.status === 404) {
        toast.error(err?.response?.data.message);
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <LoginLayout title={"Login"}>
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
            Sign in
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
                label="Username"
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={Password}
                onChange={handlePasswordChange}
                className={classes.blackBorder}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ backgroundColor: "#46c556", color: "white" }}
                disabled={!UserName || !Password}
                endIcon={<LoginIcon />}
              >
                Sign In
              </Button>

              <Link
                onClick={() => navigate("/register")}
                className="link-cursor"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </form>
        </div>
      </Dialog>
    </LoginLayout>
  );
};

export default Login;
