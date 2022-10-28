import { connect } from "react-redux";
import Nav from "../nav/Nav";

const Leaderboard = () => {
  return (
    <div>
      <Nav />
      <div className="leaderboard">
        <div>This is the future Leaderboard component</div>
      </div>
    </div>
  );
};

export default connect()(Leaderboard);
