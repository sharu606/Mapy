import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import AuthContext from "./auth-context";
import Bookmark from "./components/Bookmark/Bookmark";
import AddMap from "./components/AddMap/AddMap";

function Router() {
  const ctx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />}>
        <Route path="bookmarks" element={<Bookmark />} exact />
        <Route path="add-map" element={<AddMap />} />
      </Route>
    </Routes>
  );
}

export default Router;
