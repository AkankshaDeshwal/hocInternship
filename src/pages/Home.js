import React, { useContext } from "react";
import { AuthContext } from "../auth-context";
import { Typography } from "@material-ui/core";

const Home = (props) => {
  const auth = useContext(AuthContext);
  return (
    <div style={{ margin: "100px " }}>
      <Typography variant="h2">Welcome!!</Typography>
    </div>
  );
};

export default Home;
