import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Avatar,
  Box,
} from "@material-ui/core";
import { AuthContext } from "../../auth-context";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navBar: {
    marginLeft: "2rem",

    color: "white",
  },
});
const Header = (props) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <>
      <Box component="nav">
        <AppBar>
          <Toolbar>
            {!auth.isLoggedIn && (
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography className={classes.navBar} variant="h5">
                  Login
                </Typography>
              </Link>
            )}
            {auth.isLoggedIn && (
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Typography className={classes.navBar} variant="h5">
                  Home
                </Typography>
              </Link>
            )}
            {auth.isLoggedIn && auth.isAdmin && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Typography className={classes.navBar} variant="h5">
                  Admin Portal
                </Typography>
              </Link>
            )}
            {auth.isLoggedIn && (
              <Button
                onClick={logoutHandler}
                className={classes.navBar}
                style={{ float: "right" }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
