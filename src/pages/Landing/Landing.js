import React from "react";
import classes from "./Landing.module.css";

import { Row, Col, Image } from "react-bootstrap";
import Login from "../../components/Login/Login";
import home from "../../Assets/home.png";

function Landing() {
  return (
    <div className={classes.home}>
      <Row className="m-0 p-0">
        <Col className={classes.left + " p-0"} sm={4} md={3}>
          <div className={classes.semiCircle}>
            <Image
              src={home}
              alt="animation image"
              className={classes["home-img"]}
            ></Image>
          </div>
        </Col>
        <Col className={classes.right}>
          <Login />
        </Col>
      </Row>
    </div>
  );
}

export default Landing;
