import { handleSaveQuestionAnswer } from "../../actions/questions";
import Nav from "../../components/nav/Nav";
import { connect } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import "./Poll.css";

function roundToOneDecimal(num) {
  return Math.round(num * 10) / 10;
}

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let params = useParams();
    let navigate = useNavigate();
    let location = useLocation();

    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
const Poll = (props) => {
  if (!props.question) {
    return <Navigate to="/404" />;
  }

  if (!props.authedUser) {
    return <Navigate to="/auth" />;
  }

  const fristAnswerSelected =
    props.question.optionOne.votes.filter((v) => v === props.authedUser)
      .length > 0;

  const secondAnswerSelected =
    props.question.optionTwo.votes.filter((v) => v === props.authedUser)
      .length > 0;

  const isAnswered = fristAnswerSelected || secondAnswerSelected;

  console.log("first", fristAnswerSelected);
  console.log("second", secondAnswerSelected);

  function clickButton(e, option) {
    e.preventDefault();
    props.dispatch(
      handleSaveQuestionAnswer({
        authedUser: props.authedUser,
        qid: props.question.id,
        answer: option,
      })
    );
  }

  return (
    <div>
      <Nav />
      <div className="wrapper-container">
        <h1>Poll by {props.question.author}</h1>
        <figure>
          <img src={props.userAvatar} alt="Author Avatar" />
        </figure>
        <h1>Would You Rather</h1>
        <div className="option-container">
          <button
            className={"button-" + (fristAnswerSelected ? "voted" : "")}
            id="optionOne"
            disabled={isAnswered}
            onClick={(e) => {
              clickButton(e, "optionOne");
            }}
          >
            {props.question.optionOne.text}
          </button>
          <button
            className={"button-" + (secondAnswerSelected ? "voted" : "")}
            id="optionTwo"
            disabled={isAnswered}
            onClick={(e) => {
              clickButton(e, "optionTwo");
            }}
          >
            {props.question.optionTwo.text}
          </button>
          {isAnswered && (
            <div>
              <h3>Statistics : </h3>
              <div>
                <h4>{props.question.optionOne.text}</h4>
                <span>
                  Votes: <span>{props.question.optionOne.votes.length} </span>
                </span>
                <span>
                  (
                  {roundToOneDecimal(
                    (props.question.optionOne.votes.length /
                      (props.question.optionTwo.votes.length +
                        props.question.optionOne.votes.length)) *
                      100
                  ) + "%"}
                  )
                </span>
              </div>
              <div>
                <h4>{props.question.optionTwo.text}</h4>
                <span>
                  Votes: <span> {props.question.optionTwo.votes.length}</span>
                </span>
                <span>
                  (
                  {roundToOneDecimal(
                    (props.question.optionTwo.votes.length /
                      (props.question.optionTwo.votes.length +
                        props.question.optionOne.votes.length)) *
                      100
                  ) + "%"}
                  )
                </span>
              </div>
            </div>
          )}
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
