import React, { useEffect, useState } from "react";
import OptionsSidebar from "./OptionsSidebar";
import "./sidebar.css";
import { Avatar } from "@material-ui/core";
import {
  ExpandMoreOutlined,
  Brightness4,
  WbSunny,
  SettingsOutlined,
  CallOutlined,
  Group,
  Create,
  PersonOutlineOutlined,
  LiveHelp,
  BookmarkBorderOutlined,
  PersonAddOutlined,
  AccountBalance,
  ExpandLessOutlined,
  ExitToApp,
} from "@material-ui/icons";
import { auth } from "../../firebase/config";
import { connect } from "react-redux";
import { logoutCase } from "../redux/actions";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const options = [
  { title: "New Group", Icon: Group },
  { title: "New Channel", Icon: Create },
  { title: "Contects", Icon: PersonOutlineOutlined },
  { title: "Calls", Icon: CallOutlined },
  { title: "Saved Messages", Icon: BookmarkBorderOutlined },
  { title: "Settings", Icon: SettingsOutlined },
  { title: "Inite Friends", Icon: PersonAddOutlined },
  { title: "Telegram FAQ", Icon: LiveHelp },
];

function Sidebar({ logutUserFromRedux }) {
  const removeCookie = useCookies(["user"])[2];
  const cookie = useCookies(["user"])[0];
  const user = auth.currentUser || cookie.user;
  const history = useHistory();
  const [showAccount, setShowAccount] = useState(false);
  useEffect(() => {
    const ovellyBackground = document.getElementById("ovellyBackground");
    const sidebar = document.getElementById("sidebar");
    ovellyBackground.onclick = (e) => {
      if (e.target === ovellyBackground) {
        sidebar.style.left = "-50%";
        ovellyBackground.style.display = "none";
      }
    };
  }, []);
  const handleShowAccountClick = () => {
    setShowAccount(!showAccount);
  };
  const logoutFunc = () => {
    auth.signOut().then(() => {
      logutUserFromRedux();
      removeCookie("user");
      history.push("/login");
    });
  };

  return (
    <>
      <div className="sidebar-app" id="sidebar">
        <div className="header-main">
          <div className="sidebar-header">
            <Avatar src={auth?.currentUser?.photoURL} />
            <WbSunny />
            {/* <Brightness4 /> */}
          </div>
          <div className="sidebar-account" onClick={handleShowAccountClick}>
            <div className="user-info">
              <h3>{user?.displayName}</h3>
              <span>{user?.email}</span>
            </div>
            {!showAccount ? <ExpandMoreOutlined /> : <ExpandLessOutlined />}
          </div>
        </div>
        <div className="sidebar-options">
          <div className={`show-account ${showAccount ? "show" : "hide"}`}>
            <div className="first-account">
              <Avatar className="show-account-avatar icons" />
              <span>{user?.displayName}</span>
            </div>
            <div className="first-account">
              <AccountBalance className="icons" />
              <span>Add Account</span>
            </div>
            <div className="first-account" onClick={logoutFunc}>
              <ExitToApp className="icons" />
              <span>Log Out</span>
            </div>
          </div>
          {options.map((option, index) => {
            return <OptionsSidebar key={index} index={index} Option={option} />;
          })} 
        </div>
      </div>
      <div id="ovellyBackground"></div>
    </>
  );
}
const mapDispatch = (dispatch) => ({
  logutUserFromRedux: () => dispatch(logoutCase()),
});
const mapState = (state) => ({});
export default connect(mapState, mapDispatch)(Sidebar);
