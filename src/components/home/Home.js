import { connect } from "react-redux";
import Nav from "../nav/Nav";
import Question from "../question/Question";
import React from "react";
import { Link } from "react-router";

const Home = ({ authedUser, questions, users, answeredQuestionsTotal }) => {
  const [showUnansweredQuestions, setShowUnansweredQuestions] =
    React.useState(false);

  const onClick = () => setShowUnansweredQuestions(!showUnansweredQuestions);

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <button onClick={onClick} disabled={!showUnansweredQuestions}>
              Unanswered questions ({questions.length - answeredQuestionsTotal})
            </button>
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
                    <Question
                      question={question}
                      author={users[question.author]}
                    />
                  </Link>
                ))}
            </ul>
          </div>
          <div className="col-4">
            <button onClick={onClick} disabled={showUnansweredQuestions}>
              Answered questions ({answeredQuestionsTotal})
            </button>
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
                    <Question
                      question={question}
                      author={users[question.author]}
                    />
                  </Link>
                ))}
            </ul>
          </div>
        </div>
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
