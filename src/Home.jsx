import React, { useEffect, useState } from "react";
import UsersList from "./Components/Messages/UserList";
import Navbar from "./Components/Navbar/Navbar";
import ShowMessage from "./Components/ShowMessage";
import Sidebar from "./Components/SideBar/Sidebar";
import { auth, firestore } from "./firebase/config";

function Home() {
  const [allusers, setAllUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const arr = [];
      const users = await firestore.collection("users").get();
      try {
        users.forEach((user) => {
          if (user.data().uid != auth.currentUser.uid) {
            arr.push(user.data());
            setAllUsers([...arr]);
          }
        });
      } catch (error) {
        alert(error.message);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="left-side">
        <Navbar />
        <div className="app-messages">
          {allusers.map((user, i) => (
            <UsersList key={i} user={user} />
          ))}
        </div>
      </div>
      <div className="right-side">
        <ShowMessage />
      </div>
    </div>
  );
}

export default Home;
