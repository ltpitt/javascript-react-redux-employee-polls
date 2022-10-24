import { connect } from "react-redux";

const Poll = () => {
  return (
    <div className="poll">
      <div>Poll by author.id</div>
    </div>
  );
};

export default connect()(Poll);
