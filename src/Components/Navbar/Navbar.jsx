import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Menu } from "@material-ui/icons";
import {firestore} from '../../firebase/config'

function Navbar() {
  const [value, setValue] = useState("");
  const showSidebar = () => {
    const ovellyBackground = document.getElementById("ovellyBackground");
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = "0";
    ovellyBackground.style.display = "block";
  };
  return (
    <div className="navbar-app">
      <Menu onClick={showSidebar} className="menu" />
      <input
        className="search-input"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Navbar;
