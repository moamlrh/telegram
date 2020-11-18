import React from 'react'
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/login';
import Home from './Home';

function App({ isUserLogin }) {
  const cookie = useCookies(["user"])[0];

  return (
    <>
      <div className="app">
        <Redirect from="/" to="/"/>
        {isUserLogin || cookie.user?.uid ? <Home /> : <Login />}
      </div>
    </>
  );
}
const mapState = state => ({
  isUserLogin: state.isUserLogin
})
export default connect(mapState)(App);
