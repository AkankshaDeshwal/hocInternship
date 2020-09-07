import React from "react";
import { InputLabel, Input } from "@material-ui/core";

const InputComp = (props) => {
  return (
    <React.Fragment>
      <InputLabel htmlFor={props.id}>{props.id}</InputLabel>
      <Input id={props.id} value={props.value} onChange={props.changeHandler} />
    </React.Fragment>
  );
};

export default InputComp;
