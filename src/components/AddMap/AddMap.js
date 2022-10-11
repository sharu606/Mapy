import React, { useContext, useState, useEffect } from "react";
import classes from "./AddMap.module.css";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import RestaurantsContext from "../../restaurants-context";
import Button from "../UI/Button/Button";
import MapsContext from "../../maps-context";
import { MdDelete } from "react-icons/md";
import { BsStar } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMap() {
  const ctx = useContext(RestaurantsContext);
  const mapCtx = useContext(MapsContext);
  const [result, setResult] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["maps"]);

  function addHandler() {
    var params = {
      "ds2.name2": result,
    };
    const url = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=${encodeURIComponent(
      JSON.stringify(params)
    )}`;

    if (mapCtx.maps.includes(url) || mapCtx.bookmarks.includes(url)) {
      toast.error("Restaurant is already added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    mapCtx.setMaps((prev) => prev.concat(url));
  }

  function starHandler(url) {
    deleteHandler(url);
    mapCtx.setBookmarks((prev) => prev.concat(url));
  }

  useEffect(() => {
    setCookie("maps", JSON.stringify(mapCtx.maps), { path: "/" });
  }, [mapCtx.maps]);

  function deleteHandler(url) {
    mapCtx.setMaps((prev) => prev.filter((item) => item !== url));
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <div className={classes.wrap + " mt-3"}>
        <div className={classes.search + " mr-2"}>
          <ReactSearchAutocomplete
            items={ctx}
            autoFocus
            onSelect={(item) => {
              setResult(item.name);
            }}
            styling={{ zIndex: "99" }}
          />
        </div>
        <Button className={classes.add} onClick={addHandler}>
          Add
        </Button>
      </div>
      <div className={classes.maps}>
        {mapCtx.maps.length > 0 &&
          mapCtx.maps.map((url) => (
            <div className={classes.t} key={url}>
              <div className={classes.mapWrap}>
                <BsStar
                  className={classes.star}
                  onClick={() => starHandler(url)}
                />
                <MdDelete
                  className={classes.delete}
                  onClick={() => deleteHandler(url)}
                />
                <iframe className={classes.map} src={url}></iframe>
              </div>
            </div>
          ))}
        {!mapCtx.maps.length && (
          <div className={classes.text}>No maps added yet.</div>
        )}
      </div>
    </React.Fragment>
  );
}

export default AddMap;
