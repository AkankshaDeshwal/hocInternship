import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import {
  Box,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  FormControl,
} from "@material-ui/core";
import { AuthContext } from "../auth-context";
import { makeStyles } from "@material-ui/styles";
import InputComp from "../components/Input";

const useStyles = makeStyles({
  tableBox: {
    position: "relative",
    top: "50px",
  },
  modal: {
    margin: "100px auto",
    width: "400px",
    padding: "50px",
  },
  formControl: {
    display: "block",
    position: "relative",
    top: "10px",
  },
});

const AdminPortal = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [userList, setUserList] = useState();
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState();
  const [createUser, setCreateUser] = useState();
  const [error, setError] = useState();
  const classes = useStyles();

  const createUserHandler = () => {
    setShowForm(true);
    setUserName("");
    setPassword("");
    setUserId(null);
    setCreateUser(true);
  };

  const editUserHandler = (user) => {
    setShowForm(true);
    setUserName(user.userName);
    setPassword(user.password);
    setUserId(user._id);
    setCreateUser(false);
  };

  const deleteUserHandler = async (user) => {
    try {
      await Axios.delete(
        `https://hocinternship.herokuapp.com/api/admin/users/${user._id}`,
        {
          headers: { Authorization: "Bearer " + auth.token },
        }
      );
      window.location.reload();
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!createUser) {
      try {
        await Axios.patch(
          "https://hocinternship.herokuapp.com/api/admin/users",
          {
            userName,
            password,
            userId,
          },
          {
            headers: { Authorization: "Bearer " + auth.token },
          }
        );
      } catch (err) {
        setError("Something went wrong.");
      }
    } else {
      try {
        await Axios.post(
          "https://hocinternship.herokuapp.com/api/admin/users",
          {
            userName,
            password,
          },
          {
            headers: { Authorization: "Bearer " + auth.token },
          }
        );
      } catch (err) {
        setError("Something went wrong.");
      }
    }
    setShowForm(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const requestUsers = async () => {
      try {
        const { data } = await Axios.get(
          "https://hocinternship.herokuapp.com/api/admin/users",
          {
            headers: { Authorization: "Bearer " + auth.token },
          }
        );
        setUserList(data.users);
        setIsLoading(false);
      } catch (err) {
        setError("Something went wrong.");
      }
    };

    requestUsers();
  }, [showForm]);
  return (
    <Box className={classes.tableBox}>
      {error && !isLoading && <p>{error}</p>}
      {isLoading && <Typography variant="h4">Loading...</Typography>}
      {userList && (
        <React.Fragment>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>UserName</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userList.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => editUserHandler(user)}
                      variant="contained"
                    >
                      EDIT
                    </Button>{" "}
                    <Button
                      onClick={() => deleteUserHandler(user)}
                      variant="contained"
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
          <br />
          <Button onClick={createUserHandler} variant="contained">
            CREATE USER
          </Button>
        </React.Fragment>
      )}

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          style={{ backgroundColor: "white", padding: "10px" }}
        >
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
      </Modal>
    </Box>
  );
};

export default AdminPortal;
