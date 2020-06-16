import React from "react";

import Visits from "./components/visits";
import Sose from "./components/sose";
import Search from "./components/search";
import SearchRight from "./components/searchRight";
import Static from "./components/static";

export default function Admin() {
  return (
    <div>
      <Visits />
      <Sose />
      <Search />
      <SearchRight />
      <Static />
    </div>
  );
}