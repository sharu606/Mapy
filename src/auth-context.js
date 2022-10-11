import React from "react";

const AuthContext = React.createContext({
  authStatus: false,
  setAuth: () => {},
});

export default AuthContext;
