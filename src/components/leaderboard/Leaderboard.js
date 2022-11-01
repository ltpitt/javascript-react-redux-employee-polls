import { connect } from "react-redux";
import Nav from "../nav/Nav";
import PageNotFound from "../page_not_found/PageNotFound";

const Leaderboard = ({ authedUser, users }) => {
  const isLoggedIn = authedUser !== null;
  if (!isLoggedIn) {
    return (
      <div>
        <PageNotFound />
      </div>
    );
  }

  let classification = 0;
  console.log(users);

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="leaderboard">
          <div>
            <h1>Leaderboard</h1>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Avatar</th>
                  <th scope="col">Name</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Answers</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(users).map((user) => (
                  <tr key={users[user].id}>
                    <th scope="row">{(classification += 1)}</th>
                    <td>
                      <img alt="User avatar" src={users[user].avatarURL} />
                    </td>
                    <td>{users[user].name})</td>
                    <td>{users[user].questions.length}</td>
                    <td>{Object.keys(users[user].answers).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    users: Object.values(state.users).sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length)
    ),
    questions: state.questions,
  };
};

export default connect(mapStateToProps)(Leaderboard);
