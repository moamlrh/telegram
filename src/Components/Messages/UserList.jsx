import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { auth, database } from "../../firebase/config";
import { OpenChatOnClick, setMessagesUserClicked } from "../redux/actions";
import "./Messages.css";

function ListUsers({ user, setMessages, setUserClickedInRedux }) {
  const [LastMSG, setLastMsg] = useState("");
  const handleClickPerson = async () => {
    setUserClickedInRedux(user);
    const by = auth.currentUser.uid + user.uid;
    const to = user.uid + auth.currentUser.uid;
    const res = await database.ref(`messages/`);
    try {
      const arr = [];
      res.on("value", (snap) => {
        snap.forEach((snap) => {
          if (snap.key == by || snap.key == to) {
            res.child(snap.key == by ? by : to).on("child_added", (snap) => {
              arr.push(snap.val());
            });
          }
        });
        setMessages([...arr]);
        setLastMsg(arr[arr.length - 1]);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="messages" onClick={handleClickPerson}>
      <div className="person-msg">
        <Avatar className="avatar" src={user.photoURL} />
        <div className="person-info">
          <div>
            <h4>{user.displayName}</h4>
            <span>{user?.lastSignInTime?.slice(17)}</span>
          </div>
          <div className="last-and-badge">
            <p>{LastMSG && LastMSG?.msg?.slice(0, 25) + "..."}</p>
            <span className="badge">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatch = (dispatch) => ({
  setMessages: (messages) => dispatch(setMessagesUserClicked(messages)),
  setUserClickedInRedux: (user) => dispatch(OpenChatOnClick(user)),
});
export default connect(null, mapDispatch)(ListUsers);
