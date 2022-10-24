import { connect } from "react-redux";

const Poll = (props) => {
  console.log("Questions:");
  console.log(props.questions);
  return (
    <div className="poll">
      <div>Poll by ...</div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  try {
    // const question = Object.values(questions).find(
    //   (question) => question.id === useParams().id
    // );

    const question = questions[id];

    const author = Object.values(users).find(
      (user) => user.id === question.author
    );
    return { authedUser, question, author };
  } catch (e) {
    console.log("Question or user is not found:" + { e });
  }
};

export default connect(mapStateToProps)(Poll);
