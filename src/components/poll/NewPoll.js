import { connect } from "react-redux";
import Nav from "../nav/Nav";

const Poll = () => {
  return (
    <div>
      <Nav />
      <div className="poll">
        <div>This is the future Poll component</div>
      </div>
    </div>
  );
};

export default connect()(Poll);
