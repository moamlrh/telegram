import React from "react";
import "./navbar.css";
import { Menu } from "@material-ui/icons";

function Navbar() {
  const showSidebar = () => {
    const ovellyBackground = document.getElementById("ovellyBackground");
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = "0";
    ovellyBackground.style.display = "block";
  };

  return (
    <div className="navbar-app">
      <Menu onClick={showSidebar} className="menu" />
      <input className="search-input" placeholder="Search" />
    </div>
  );
}

export default Navbar;
