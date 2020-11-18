import { IconButton } from "@material-ui/core";
import {
  AttachFileOutlined,
  Call,
  EmojiEmotionsOutlined,
  MoreVert,
  Search,
  Send,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { auth, database } from "../firebase/config";
import MessageComp from "./MessageComp";
import { setLastMessage } from "./redux/actions";
import "./ShowMessage.css";

function ShowMessage({ messages, userIdClicked }) {
  const [value, setValue] = useState("");
  const handleBtnSendClick = () => {
    if (value) {
      database
        .ref(`messages/${auth.currentUser.uid + userIdClicked.uid}/`)
        .push({
          msg: value,
          by: auth.currentUser.uid,
          to: userIdClicked.uid,
          timestamp: Date.now(),
        });
      setValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        const btn = document.getElementById("btn");
        btn.click();
      }
    });
  }, []);

  return (
    <div className="show-message">
      <div className="sm-header">
        <div className="title">
          <h4>{userIdClicked.displayName}</h4>
          <span>last seen recently</span>
        </div>
        <div className="icons">
          <Call />
          <Search />
          <MoreVert />
        </div>
      </div>
      <div className="body">
        {messages
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((msg, index) => {
            return <MessageComp msg={msg} key={index} />;
          })}
      </div>
      <div className="sm-input">
        <AttachFileOutlined className="add-file hover" />
        <input
          placeholder="Write a message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <EmojiEmotionsOutlined className="emoji hover" />
        <IconButton
          onClick={handleBtnSendClick}
          className="voice hover"
          id="btn"
        >
          <Send />
        </IconButton>
      </div>
    </div>
  );
}
const mapState = (state) => ({
  userIdClicked: state.userIdClicked,
  lastMsg: state.lastMsg,
  messages: state.msgsUserClicked,
});

const mapDispatch = (dispatch) => ({
  setLastMessageInRedux: (info) => dispatch(setLastMessage(info)),
});

export default connect(mapState, mapDispatch)(ShowMessage);
