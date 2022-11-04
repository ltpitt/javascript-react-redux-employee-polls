import { handleSaveQuestionAnswer } from "../../actions/questions";
import Nav from "../../components/nav/Nav";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const Poll = ({ authedUser, userAvatar, question, dispatch }) => {
  const fristAnswerSelected =
    question.optionOne.votes.filter((v) => v === authedUser).length > 0;

  const secondAnswerSelected =
    question.optionTwo.votes.filter((v) => v === authedUser).length > 0;

  const isAnswered = fristAnswerSelected || secondAnswerSelected;

  function clickButton(e, option) {
    e.preventDefault();
    dispatch(
      handleSaveQuestionAnswer({
        authedUser: authedUser,
        qid: question.id,
        answer: option,
      })
    );
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="wrapper-container">
          <h1>Poll by {question.author}</h1>
          <figure>
            <img src={userAvatar} alt="Author Avatar" />
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
              {question.optionOne.text}
            </button>
            <button
              className={"button-" + (secondAnswerSelected ? "voted" : "")}
              id="optionTwo"
              disabled={isAnswered}
              onClick={(e) => {
                clickButton(e, "optionTwo");
              }}
            >
              {question.optionTwo.text}
            </button>
            {isAnswered && (
              <div>
                <h3>Statistics : </h3>
                <div>
                  <h4>{question.optionOne.text}</h4>
                  <span>Votes: {question.optionOne.votes.length}</span>
                  <span>
                    {" "}
                    (
                    {roundToOneDecimal(
                      (question.optionOne.votes.length /
                        (question.optionTwo.votes.length +
                          question.optionOne.votes.length)) *
                        100
                    ) + "%"}
                    )
                  </span>
                </div>
                <div>
                  <h4>{question.optionTwo.text}</h4>
                  <span>Votes: {question.optionTwo.votes.length}</span>
                  <span>
                    {" "}
                    (
                    {roundToOneDecimal(
                      (question.optionTwo.votes.length /
                        (question.optionTwo.votes.length +
                          question.optionOne.votes.length)) *
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
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const userAvatar = question ? users[question?.author]?.avatarURL : null;

  return {
    id,
    userAvatar,
    authedUser,
    question,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));
