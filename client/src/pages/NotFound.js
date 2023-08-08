import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button, Grid } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    textAlign: "center",
  },
  icon: {
    fontSize: "6rem",
    color: theme.palette.error.main,
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <ErrorOutlineIcon className={classes.icon} />
        <Typography variant="h4" className={classes.heading}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" className={classes.text}>
          We couldn't find the page you were looking for.
        </Typography>
        <Typography variant="body1" className={classes.text}>
          Please check the URL and try again.
        </Typography>
        <Grid container justify="center">
          <Grid item>
            <Button
              variant="contained"
              style={{ backgroundColor: "#46c556", color: "white" }}
              className={classes.button}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NotFound;
