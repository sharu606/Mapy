import React from "react";
import classes from "./Card.module.css";

function Card(props) {
  const classNames = classes.card + " " + props.className;
  return (
    <div className={classNames} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Card;
