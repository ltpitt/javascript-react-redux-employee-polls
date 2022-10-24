import { connect } from "react-redux";
import Nav from "../nav/Nav";
import Question from "../question/Question";
import React from "react";

const Home = (props) => {
  const [showUnansweredQuestions, setShowUnansweredQuestions] =
    React.useState(true);

  const onClick = () => setShowUnansweredQuestions(!showUnansweredQuestions);

  return (
    <div>
      <h3 className="text-center">
        {props.users[props.authedUser]
          ? "Welcome to employee polls, " + props.users[props.authedUser].name
          : "Loading..."}
        .
      </h3>
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
            <li key={question.id}>
              <Question
                question={question}
                author={props.users[question.author]}
              />
            </li>
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
            <li key={question.id}>
              <Question
                question={question}
                author={props.users[question.author]}
              />
            </li>
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
