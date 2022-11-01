import { connect } from "react-redux";
import Nav from "../nav/Nav";
import PageNotFound from "../page_not_found/PageNotFound";

const Leaderboard = ({ authedUser }) => {
  const isLoggedIn = authedUser !== null;
  if (!isLoggedIn) {
    return (
      <div>
        <PageNotFound />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="leaderboard">
          <div>This is the future Leaderboard component</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    users: state.users,
  };
};

export default connect(mapStateToProps)(Leaderboard);
