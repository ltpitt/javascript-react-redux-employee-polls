import { connect } from "react-redux";
import Nav from "../nav/Nav";
import Question from "../question/Question";
import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [showUnansweredQuestions, setShowUnansweredQuestions] =
    React.useState(true);

  const onClick = () => setShowUnansweredQuestions(!showUnansweredQuestions);

  return (
    <div>
      <Nav />
      <h2 onClick={onClick}>Unanswered questions</h2>
      <ul
        className="unanswered-questions-list"
        hidden={showUnansweredQuestions}
      >
        {props.questions
          .filter(
            (question) =>
              !question.optionOne.votes.includes(props.authedUser) &&
              !question.optionTwo.votes.includes(props.authedUser)
          )
          .map((question) => (
            <Link to={`/questions/${question.id}`} key={question.id}>
              <Question
                question={question}
                author={props.users[question.author]}
              />
            </Link>
          ))}
      </ul>
      <h2 onClick={onClick}>Answered questions</h2>
      <ul className="answered-questions-list" hidden={!showUnansweredQuestions}>
        {props.questions
          .filter(
            (question) =>
              question.optionOne.votes.includes(props.authedUser) ||
              question.optionTwo.votes.includes(props.authedUser)
          )
          .map((question) => (
            <Link to={`/questions/${question.id}`} key={question.id}>
              <Question
                question={question}
                author={props.users[question.author]}
              />
            </Link>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Home);
