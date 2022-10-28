import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = (users) => {
  return (
    <div className="container">
      {/* <!-- Navbar --> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          {/* <!-- Navbar brand --> */}
          <a className="navbar-brand" href="#">
            <img
              src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
              height="30"
              alt=""
              loading="lazy"
            />
          </a>

          {/* <!-- Toggle button --> */}
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

          {/* <!-- Collapsible wrapper --> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <!-- Left links --> */}
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
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  {users.authedUser
                    ? "Logout ( " + users.users[users.authedUser].name + " )"
                    : "Login"}
                </Link>
              </li>
            </ul>
            {/* <!-- Left links --> */}

            <ul className="navbar-nav mb-2 mb-lg-0">
              {/* <!-- Navbar dropdown --> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(2).jpg"
                    className="rounded-circle img-fluid"
                    height="25"
                    width="25"
                  />
                </a>
                {/* <!-- Dropdown menu --> */}
                <ul
                  className="dropdown-menu dropdown-menu-end p-1"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="my-2 d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg"
                      className="rounded-circle img-fluid me-1"
                      height="25"
                      width="25"
                    />
                    <span> User 1</span>
                  </li>
                  <li className="my-2 d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img%20(6).jpg"
                      className="rounded-circle img-fluid me-1"
                      height="25"
                      width="25"
                    />
                    <span> User 2</span>
                  </li>
                  <li className="my-2 d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg"
                      className="rounded-circle img-fluid me-1"
                      height="25"
                      width="25"
                    />
                    <span> User 3</span>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Manage Profilses
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Your Account
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Help
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Log Out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* <!-- Collapsible wrapper --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
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
