import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Nav = (users) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new">
                New
              </Link>
            </li>
            <li className="nav-item navbar-right">
              <Link className="nav-link" to="/auth">
                {users.authedUser
                  ? "Logout ( " + users.users[users.authedUser].name + " )"
                  : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Nav);

// <nav classNameName="nav">
// <ul>
//   <li>
//     <Link to="/">Home</Link>
//   </li>
//   <li>
// <Link to="/leaderboard">Leaderboard</Link>
// </li>
// <li>
// <Link to="/new">New</Link>
// </li>
// <li>Current user</li>
// <li>
// <Link to="/logout">Logout</Link>
// </li>
// </ul>
// </nav>
