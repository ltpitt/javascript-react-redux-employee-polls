import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Nav.css";
import { setAuthedUser } from "../../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Nav = ({ authedUser, users, dispatch }) => {
  const navigate = useNavigate();

  const isLoggedIn = authedUser !== null;
  if (!isLoggedIn) {
    navigate("/auth");
  }

  function changeUser(e, userId) {
    e.preventDefault();
    dispatch(setAuthedUser(userId));
    navigate("/");
  }

  function logout(e) {
    e.preventDefault();
    dispatch(setAuthedUser(null));
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            <img src="/logo192.png" height="30" alt="" loading="lazy" />
          </Link>

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

            <div id="loggedUserName" data-testid="loggedUserName">
              {authedUser ? "Hi,  " + users[authedUser].name + "." : "Login ->"}
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li
                className="nav-item dropdown"
                key={authedUser ? users[authedUser].id : ""}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  data-testid="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      authedUser ? users[authedUser].avatarURL : "/login192.png"
                    }
                    className="rounded-circle img-fluid"
                    height="25"
                    width="25"
                    id="authedUserAvatar"
                  />
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end p-1"
                  aria-labelledby="navbarDropdown"
                >
                  {authedUser
                    ? Object.keys(users)
                        .filter((user) => user === users[authedUser].id)
                        .map((user) => (
                          <li
                            key={users[user].id}
                            className="my-2 d-flex align-items-center"
                            onClick={(e) => {
                              changeUser(e, users[user].id);
                            }}
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
                        ))
                    : Object.keys(users).map((user) => (
                        <li
                          key={users[user].id}
                          className="my-2 d-flex align-items-center"
                          onClick={(e) => {
                            changeUser(e, users[user].id);
                          }}
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
                  <li
                    onClick={(e) => {
                      logout(e);
                    }}
                  >
                    <a className="nav-link" to="#">
                      Log Out
                    </a>
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
