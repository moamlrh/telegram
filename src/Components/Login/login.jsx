import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  auth,
  firestore,
  database,
  googleProvider,
} from "../../firebase/config";
import { loginCase } from "../redux/actions";
import "./login.css";

function Login({ user, setUserLoginInRedux }) {
  const setCookie = useCookies(["user"])[1];
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCookie("user", JSON.stringify(user));
        setUserLoginInRedux(user);
        firestore.collection("users").doc(user.email).set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          timestamp: new Date(),
          lastSignInTime: user.metadata.lastSignInTime
        }).catch(err => alert(err.message))
      }
    });
  }, []);

  const loginWithEmailAndPassword = () => {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((user) => {
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const loginWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(({ user }) => {
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login-with-email">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={loginWithEmailAndPassword}>Login</button>
      </div>
      <Button variant="outlined" onClick={loginWithGoogle}>
        Login With Google
      </Button>
    </div>
  );
}

const mapState = (state) => ({
  user: state.user,
});
const mapDispatch = (dispatch) => ({
  setUserLoginInRedux: (user) => dispatch(loginCase(user)),
});
export default connect(mapState, mapDispatch)(Login);
