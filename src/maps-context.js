import React from "react";

const MapsContext = React.createContext({
  maps: [],
  bookmarks: [],
  setMaps: () => {},
  setBookmarks: () => {},
});

export default MapsContext;
