import React, { useContext, useEffect, useState } from "react";
import classes from "./Home.module.css";
import axios from "axios";

import Button from "../../components/UI/Button/Button";
import { Nav, Row, Col } from "react-bootstrap";
import AuthContext from "../../auth-context";
import MapsContext from "../../maps-context";
import { Outlet, NavLink } from "react-router-dom";
import RestaurantsContext from "../../restaurants-context";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const url =
  "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?&view=Grid%20view";

function Home() {
  const ctx = useContext(AuthContext);
  const { data } = useQuery("restaurants", fetchData);
  const [cookies, setCookie, removeCookie] = useCookies(["map"]);
  const [maps, setMaps] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.maps) {
      setMaps(cookies.maps);
    }
    if (cookies.bookmarks) {
      setBookmarks(cookies.bookmarks);
    }
  }, []);

  function logoutHandler() {
    localStorage.setItem("auth", false);
    ctx.setAuth(false);
    navigate("/", { replace: true });
  }

  async function fetchData() {
    const { data } = await axios.get(url, {
      headers: { Authorization: "Bearer keyfXgn8PL6pB3x32" },
    });
    return data.records.map((record) => ({
      id: record.id,
      name: record.fields.Name,
    }));
  }

  return (
    <RestaurantsContext.Provider value={data}>
      <MapsContext.Provider
        value={{
          maps: maps,
          bookmarks: bookmarks,
          setMaps: setMaps,
          setBookmarks: setBookmarks,
        }}
      >
        <Nav className={"justify-content-end p-2 " + classes.nav}>
          <Button className={classes.logout} onClick={logoutHandler}>
            Logout
          </Button>
        </Nav>
        <Row className="m-0 p-0">
          <Col sm={3} className={classes.left + " pt-3"}>
            <NavLink
              to="/home/add-map"
              className={(active) =>
                `mt-4 mb-4 ${classes.links} ${
                  active.isActive ? classes.active : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/home/bookmarks"
              className={(active) =>
                `mt-4 mb-4 ${classes.links} ${
                  active.isActive ? classes.active : ""
                }`
              }
            >
              Bookmarked restaurants
            </NavLink>
          </Col>
          <Col className={classes.right}>
            <Outlet />
          </Col>
        </Row>
      </MapsContext.Provider>
    </RestaurantsContext.Provider>
  );
}

export default Home;
