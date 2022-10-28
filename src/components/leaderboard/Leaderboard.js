import { connect } from "react-redux";
import Nav from "../nav/Nav";

const Leaderboard = () => {
  return (
    <div>
      <Nav />
      <div className="leaderboard">
        <div>Leaderboard</div>
      </div>
    </div>
  );
};

export default connect()(Leaderboard);
