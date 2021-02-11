import { IconButton } from "@material-ui/core";
import {
  AttachFileOutlined,
  Call,
  EmojiEmotionsOutlined,
  MoreVert,
  Search,
  Send,
} from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { auth, database } from "../firebase/config";
import MessageComp from "./MessageComp";
import "./ShowMessage.css";

const skeletonComp = () => {
  const arr = [];
  for (let i = 1; i < 15; i++) {
    arr.push(
      <Skeleton key={i} variant="text" className={i % 2 == 0 && "skele-2"} />
    );
  }
  return arr;
};

function ShowMessage({ messages, userIdClicked }) {
  const [value, setValue] = useState("");
  const handleBtnSendClick = async () => {
    const userAuth = auth.currentUser.uid;
    const userId = userIdClicked.uid;
    const req = await database.ref(`messages/${userAuth + userId}/`);
    try {
      if (value) {
        req.push({
          msg: value,
          by: userAuth,
          to: userId,
          timestamp: Date.now(),
        });
        setValue("");
      }
    } catch (error) {
      alert(error.message);
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
          <h4>{userIdClicked?.displayName}</h4>
          <span>last seen recently</span>
        </div>
        <div className="icons">
          <Call />
          <Search />
          <MoreVert />
        </div>
      </div>
      <div className="body">
        {messages.length === 0 && (
          <div className="skeleton">{skeletonComp().map((comp) => comp)}</div>
        )}
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
          disabled={messages.length === 0 ? true : false}
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
  messages: state.msgsUserClicked,
  userIdClicked: state.userIdClicked,
});

export default connect(mapState)(ShowMessage);
