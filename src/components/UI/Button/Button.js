import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  const classNames = classes.button + " " + props.className;

  return (
    <button className={classNames} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
