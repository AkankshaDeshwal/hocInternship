import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { CssBaseline, Box } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AdminPortal from "./pages/AdminPortal";
import { AuthContext } from "./auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  //const classes = useStyles;

  const login = useCallback((userName, token, isAdmin) => {
    console.log(userName);
    setIsLoggedIn(true);
    console.log(isLoggedIn);
    setUserName(userName);
    setToken(token);
    setIsAdmin(isAdmin);
    sessionStorage.setItem(
      "userData",
      JSON.stringify({
        userName: userName,
        token: token,
        isLoggedIn: true,
        isAdmin: isAdmin,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserName(null);
    setToken(null);
    sessionStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userName, storedData.token, storedData.isAdmin);
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/admin" exact component={AdminPortal} />
        <Route path="/home" exact component={Home} />

        <Redirect to="/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Box>
      <CssBaseline />
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userName: userName,
          token: token,
          isAdmin: isAdmin,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Header />

          {routes}
        </Router>
      </AuthContext.Provider>
    </Box>
  );
}

export default App;
