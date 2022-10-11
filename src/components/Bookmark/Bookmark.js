import React, { useContext, useEffect } from "react";
import classes from "./Bookmark.module.css";

import { MdDelete } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";
import MapsContext from "../../maps-context";
import { useCookies } from "react-cookie";

function Bookmark() {
  const mapCtx = useContext(MapsContext);
  const [cookies, setCookie, removeCookie] = useCookies(["maps"]);

  function deleteHandler(url) {
    mapCtx.setBookmarks((prev) => prev.filter((item) => item !== url));
  }

  function starHandler(url) {
    deleteHandler(url);
    mapCtx.setMaps((prev) => prev.concat(url));
  }

  useEffect(() => {
    setCookie("bookmarks", JSON.stringify(mapCtx.bookmarks), { path: "/" });
  }, [mapCtx.bookmarks]);


  return (
    <div className={classes.maps}>
      {mapCtx.bookmarks.length > 0 &&
        mapCtx.bookmarks.map((url) => (
          <div className={classes.t}>
            <div className={classes.mapWrap}>
              <BsFillStarFill
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
      {!mapCtx.bookmarks.length && (
        <div className={classes.text}>No maps Bookmarked yet.</div>
      )}
    </div>
  );
}

export default Bookmark;
