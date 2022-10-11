import { connect } from "react-redux";

const Question = ({ question, author }) => {
  return (
    <div className="question">
      <div>
        <img src={author?.avatarURL} />
      </div>
      <div>
        <div>{question.author}</div>
        <p>{new Date(question.timestamp).toUTCString()}</p>
      </div>
    </div>
  );
};

export default connect()(Question);
