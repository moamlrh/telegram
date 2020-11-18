import React from "react";

function OptionsSidebar({ Option }) {
  return (
    <div className="options-sidebar">
      <Option.Icon className="icons" />
      <h4>{Option.title}</h4>
    </div>
  );
}

export default OptionsSidebar;
