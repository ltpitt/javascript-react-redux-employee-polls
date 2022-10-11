import { connect } from "react-redux";
import Nav from "../nav/Nav";
import Question from "../question/Question";

const Home = (props) => {
  console.log(props.authedUser);
  return (
    <div>
      <h3 className="text-center">Employee polls</h3>
      <Nav />
      <h2>Unanswered questions</h2>
      <ul className="unanswered-questions-list">
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
      <h2>Answered questions</h2>
      <ul className="answered-questions-list">
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
