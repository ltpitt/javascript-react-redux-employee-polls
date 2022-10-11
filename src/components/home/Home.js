import { connect } from "react-redux";
import Nav from "../nav/Nav";
import Question from "../question/Question";

const Home = (props) => {
  console.log(props);
  return (
    <div>
      <h3 className="text-center">Employee polls</h3>
      <Nav />
      <ul className="home-list">
        {props.questions.map((question) => (
          <li key={question.id}>
            <Question
              question={question}
              author={props.users[question.author]}
            />
          </li>
        ))}
      </ul>
      Home
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Home);
