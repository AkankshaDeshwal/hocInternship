import React, { useContext, useState } from "react";
import { AuthContext } from "../auth-context";
import Axios from "axios";
import { FormControl, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import InputComp from "../components/Input";

const useStyles = makeStyles({
  loginBox: {
    backgroundColor: "#fffss",

    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "400px",
    padding: "20px",
    height: "500px",
    boxShadow: "2px 1px 3px 1px rgba(0, 0, 0, 0.6)",
  },
  formControl: {
    display: "block",
    position: "relative",
    top: "10px",
  },
});

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const classes = useStyles();

  const switchHandler = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const { data } = await Axios.post(
          "https://hocinternship.herokuapp.com/api/login",
          {
            userName,
            password,
          }
        );

        auth.login(data.userName, data.token, data.isAdmin);
        props.history.push("/home");
      } catch (err) {
        setError("Check user details or try again later");
      }
    } else {
      try {
        const { data } = await Axios.post(
          "https://hocinternship.herokuapp.com/api/signup",
          {
            userName,
            password,
          }
        );
        auth.login(data.userName, data.token, data.isAdmin);
        props.history.push("/home");
      } catch (err) {
        setError("Something went wrong.");
      }
    }
  };
  return (
    <Box className={classes.loginBox}>
      <Typography display="block" variant="h3">
        {isLogin ? "LOGIN" : "SIGNUP"}
      </Typography>
      {error && <p>{error}</p>}
      <br />

      <Box component="div">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <FormControl className={classes.formControl}>
            <InputComp
              id="userName"
              value={userName}
              changeHandler={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputComp
              id="password"
              value={password}
              changeHandler={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
      <br />
      <br />
      <Box component="div">
        <Typography variant="subtitle">
          {isLogin
            ? "Don't have an account? Sign up now!"
            : "Have an account? Login now!"}
        </Typography>
      </Box>
      <br />
      <Button onClick={switchHandler} variant="contained">
        {isLogin ? " SWITCH TO SIGN UP" : "SWITCH TO LOGIN"}
      </Button>
    </Box>
  );
};

export default Auth;
