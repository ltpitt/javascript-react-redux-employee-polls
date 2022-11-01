import { connect } from "react-redux";
import Nav from "../nav/Nav";
import Question from "../question/Question";
import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../page_not_found/PageNotFound";

const Home = ({ authedUser, questions, users, answeredQuestionsTotal }) => {
  const [showUnansweredQuestions, setShowUnansweredQuestions] =
    React.useState(true);

  const onClick = () => setShowUnansweredQuestions(!showUnansweredQuestions);

  const isLoggedIn = authedUser !== null;
  console.log("isLoggedIn", isLoggedIn);

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
        <h4 onClick={onClick}>
          Unanswered questions ({questions.length - answeredQuestionsTotal})
        </h4>
        <ul
          className="unanswered-questions-list"
          hidden={showUnansweredQuestions}
        >
          {questions
            .filter(
              (question) =>
                !question.optionOne.votes.includes(authedUser) &&
                !question.optionTwo.votes.includes(authedUser)
            )
            .map((question) => (
              <Link to={`/questions/${question.id}`} key={question.id}>
                <Question question={question} author={users[question.author]} />
              </Link>
            ))}
        </ul>
        <h4 onClick={onClick}>Answered questions ({answeredQuestionsTotal})</h4>
        <ul
          className="answered-questions-list"
          hidden={!showUnansweredQuestions}
        >
          {questions
            .filter(
              (question) =>
                question.optionOne.votes.includes(authedUser) ||
                question.optionTwo.votes.includes(authedUser)
            )
            .map((question) => (
              <Link to={`/questions/${question.id}`} key={question.id}>
                <Question question={question} author={users[question.author]} />
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  answeredQuestionsTotal: Object.values(questions).filter(
    (question) =>
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
  ).length,
  users,
});

export default connect(mapStateToProps)(Home);
