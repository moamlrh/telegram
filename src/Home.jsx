import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Messages from "./Components/Messages/Messages";
import Navbar from "./Components/Navbar/Navbar";
import ShowMessage from "./Components/ShowMessage";
import Sidebar from "./Components/SideBar/Sidebar";
import { auth, firestore } from "./firebase/config";

function Home({ ClickedOnChat, userIdClicked }) {
  const [allusers, setAllUsers] = useState([]);
  const getUsersFromDataBase = () => {
    const arr = [];
    firestore
      .collection("users")
      .get()
      .then((users) => {
        if (users) {
          users.forEach((user) => {
            if (user.data().uid === auth.currentUser.uid) {
              console.log(null);
            } else {
              arr.push(user.data());
              setAllUsers([...arr]);
            }
          });
        }
      });
  };
  useEffect(() => {
    getUsersFromDataBase();
  },[])
  return (
    <div className="home"> 
      <Sidebar />
      <div className="left-side">
        <Navbar />
        <div className="app-messages">
          {allusers.length === 0 ? (
            <div className="circle-progress">
              <CircularProgress />
            </div>
          ) : (
            allusers.map((user, index) => {
              return <Messages key={index} user={user} />;
            })
          )}
        </div>
      </div>
      <div className="right-side">
        {ClickedOnChat ? (
          <ShowMessage user={userIdClicked} />
        ) : (
          <h1 className="click-someone">Click someone to chat with :)</h1>
        )}
      </div>
    </div>
  );
}
const mapState = (state) => ({
  ClickedOnChat: state.ClickedOnChat,
  userIdClicked: state.userIdClicked,
});
export default connect(mapState)(Home);
