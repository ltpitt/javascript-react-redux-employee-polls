import { connect } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import Nav from "../nav/Nav";

import { handleAddAnswer } from "../../actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
const Poll = (props) => {
  // if (!authedUser || !question || !author) {
  //   return <Navigate to="/404" />;
  // }

  if (!props.question) return <Navigate to="/404" />;
  const fristAnswerSelected =
    props.question.optionOne.votes.filter((v) => v === props.authedUser)
      .length > 0;

  const secondAnswerSelected =
    props.question.optionTwo.votes.filter((v) => v === props.authedUser)
      .length > 0;

  const isAnswered = fristAnswerSelected || secondAnswerSelected;

  function clickButton(e, option) {
    e.preventDefault();
    console.log(
      "calling handleAddAnswer passing authedUser = " +
        props.authedUser +
        " and question.id = " +
        props.question.id +
        " and option = " +
        option
    );
    props.dispatch(
      handleAddAnswer({
        authedUser: props.authedUser,
        questionId: props.question.id,
        answer: option,
      })
    );
  }

  return (
    <div>
      <Nav />
      <div>
        <h1>Poll by {props.question.author} </h1>
        <figure>
          <img src={props.userAvatar} alt="Author Avatar" />
        </figure>
        <h1>Would You Rather </h1>
        <div className="option-container">
          <button
            className={
              "button-option" + (fristAnswerSelected ? " selected " : "")
            }
            id="optionOne"
            disabled={isAnswered}
            onClick={(e) => {
              clickButton(e, "optionOne");
            }}
          >
            {" "}
            {props.question.optionOne.text}
          </button>
          <button
            className={
              "button-option" + (secondAnswerSelected ? " selected " : "")
            }
            id="optionTwo"
            disabled={isAnswered}
            onClick={(e) => {
              clickButton(e, "optionTwo");
            }}
          >
            {" "}
            {props.question.optionTwo.text}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const userAvatar = users[question?.author]?.avatarURL;

  return {
    id,
    userAvatar,
    authedUser,
    question,
    questions,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));
