import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
import axios from "axios";

import { Alert } from "react-bootstrap";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import AuthContext from "../../auth-context";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const baseURL =
  "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const { data } = useQuery("users", fetchData);

  function loginHandler() {
    if (!username) {
      setError("Enter Username");
      return;
    }
    if (!password) {
      setError("Enter Password");
      return;
    }

    data.forEach((info) => {
      if (info.username === username && info.password === password) {
        localStorage.setItem("auth", true);
        navigate("home/add-map", { replace: true });
        ctx.setAuth(true);
      }
    });

    if (!ctx.authStatus) {
      setError("Invalid Username or Password");
    }
  }

  async function fetchData() {
    const { data } = await axios.get(baseURL, {
      headers: { Authorization: "Bearer keyfXgn8PL6pB3x32" },
    });
    return data.records.map((record) => record.fields);
  }

  return (
    <>
      <Card className="p-3">
        <span>Login</span>
        <Card>
          <input
            className={classes["ip-field"] + " m-2 mt-5"}
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            className={classes["ip-field"] + " m-2 mt-3"}
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <Button onClick={loginHandler} className="mt-4 mb-3">
            Login
          </Button>
        </Card>
      </Card>
      {error && (
        <Alert key="danger" variant="danger" className={"p-2 " + classes.error}>
          {error}
        </Alert>
      )}
    </>
  );
}

export default Login;
