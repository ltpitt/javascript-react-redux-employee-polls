import { Navigate } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({ children, loggedIn }) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  return loggedIn ? (
    children
  ) : (
    <Navigate to={`/auth?redirectTo=${redirectUrl}`} />
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
