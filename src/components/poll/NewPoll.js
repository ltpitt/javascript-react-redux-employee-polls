import { connect } from "react-redux";
import Nav from "../nav/Nav";

const Poll = () => {
  return (
    <div>
      <Nav />
      <div className="poll">
        <div>Poll by author.id</div>
      </div>
    </div>
  );
};

export default connect()(Poll);
