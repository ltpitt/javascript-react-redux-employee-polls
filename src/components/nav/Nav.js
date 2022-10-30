import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = ({ authedUser, users }) => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/logo192.png" height="30" alt="" loading="lazy" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
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
            </ul>

            {authedUser
              ? "Hi,  " + users[authedUser].name + "."
              : "Please login"}
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li
                className="nav-item dropdown"
                key={authedUser ? users[authedUser].id : ""}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={authedUser ? users[authedUser].avatarURL : ""}
                    className="rounded-circle img-fluid"
                    height="25"
                    width="25"
                  />
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end p-1"
                  aria-labelledby="navbarDropdown"
                >
                  {Object.keys(users)
                    .filter((user) => user !== users[authedUser].id)
                    .map((user) => (
                      <li
                        key={users[user].id}
                        className="my-2 d-flex align-items-center"
                      >
                        <a className="dropdown-item" href="#">
                          <img
                            src={users[user].avatarURL}
                            className="rounded-circle img-fluid me-1"
                            height="25"
                            width="25"
                          />
                          <span> {users[user].name}</span>
                        </a>
                      </li>
                    ))}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="nav-link" to="/auth">
                      Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
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
