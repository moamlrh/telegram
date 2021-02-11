import React from "react";
import SettingsPage from "./SettingsPage";

function OptionsSidebar({ Option, index }) {
  const { setOpen, settingsComp } = SettingsPage();
  const handleClickSettings = () => {
    const ovellyBackground = document.getElementById("ovellyBackground");
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = "-50%";
    ovellyBackground.style.display = "none";
    if (index === 5) {
      setOpen(1);
    }
  };
  return (
    <div className="options-sidebar" onClick={handleClickSettings}>
      <Option.Icon className="icons" />
      <h4>{Option.title}</h4>
      {settingsComp}
    </div>
  );
}

export default OptionsSidebar;
