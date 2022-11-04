import React from "react";
import "./Auth.css";
import { connect } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { handleLogin } from "../../actions/authedUser";

const Auth = ({ dispatch, loggedIn, authedUser }) => {
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");
  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password));
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              value={username}
              onChange={handleUsername}
              type="test"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              value={password}
              onChange={handlePassword}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  loggedIn: !!authedUser,
  authedUser,
  users,
});

export default connect(mapStateToProps)(Auth);
