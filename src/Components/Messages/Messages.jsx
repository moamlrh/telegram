import { Avatar, Badge } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { auth, database } from "../../firebase/config";
import {
  OpenChatOnClick,
  setLastMessage,
  setMessagesUserClicked,
} from "../redux/actions";

import "./Messages.css";
function Messages({
  user,
  openPersonClicked,
  setLastMessageInRedux,
  lastMsg,
  msgsUserClicked,
}) {
  const handleClickPerson = () => {
    openPersonClicked(user);
    database.ref(`messages/`).on("value", (snap) => {
      const by = auth.currentUser.uid + user.uid;
      const to = user.uid + auth.currentUser.uid;
      const arr = [];
      snap.forEach((snap) => {
        if (snap.key == by || snap.key == to) {
          database
            .ref(`messages/`)
            .child(snap.key == by ? by : to)
            .on("child_added", (snap) => {
              arr.push(snap.val());
            });
        }
        setLastMessageInRedux(arr[arr.length - 1]);
        msgsUserClicked([...arr]);
      });
    });
  };
  return (
    <div className="messages" onClick={handleClickPerson}>
      <div className="person-msg">
        <Avatar className="avatar" src={user.photoURL} />
        <div className="person-info">
          <div>
            <h4>{user.displayName}</h4>
            <span>
              {new Date(user.timestamp).toLocaleString().split(",")[1]}
            </span>
          </div>
          <div className="last-and-badge">
            <p>
              {(lastMsg?.to == user.uid || lastMsg?.by == user.uid) &&
                lastMsg?.by == auth.currentUser.uid &&
                (lastMsg?.msg?.length > 20
                  ? lastMsg?.msg?.slice(0, 20) + "..."
                  : lastMsg?.msg)}
            </p>
            <span className="badge">43</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  lastMsg: state.lastMsg,
});

const mapDispatch = (dispatch) => ({
  openPersonClicked: (id) => dispatch(OpenChatOnClick(id)),
  msgsUserClicked: (msgs) => dispatch(setMessagesUserClicked(msgs)),
  setLastMessageInRedux: (info) => dispatch(setLastMessage(info)),
});
export default connect(mapState, mapDispatch)(Messages);
