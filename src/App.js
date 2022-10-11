import React, { useState } from "react";
import "./App.css";

import AuthContext from "./auth-context";
import Router from "./Router.js";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth"));

  return (
    <AuthContext.Provider value={{ authStatus: auth, setAuth: setAuth }}>
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
