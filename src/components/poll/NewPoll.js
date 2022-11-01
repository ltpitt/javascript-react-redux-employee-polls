import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../../actions/questions";
import Nav from "../nav/Nav";
import PageNotFound from "../page_not_found/PageNotFound";

const NewPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const isLoggedIn = authedUser !== null;
  if (!isLoggedIn) {
    return (
      <div>
        <PageNotFound />
      </div>
    );
  }

  const handleFirstOptionChange = (e) => {
    setFirstOption(e.target.value);
  };

  const handleSecondOptionChange = (e) => {
    setSecondOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(firstOption, secondOption));
    navigate("/");
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <h1>New Poll</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Option</label>
            <div className="mt-1">
              <input
                value={firstOption}
                onChange={handleFirstOptionChange}
                type="text"
                name="firstOption"
                id="firstOption"
                data-testid="firstOption"
              />
            </div>
          </div>

          <div>
            <label>Second Option</label>
            <div>
              <input
                value={secondOption}
                onChange={handleSecondOptionChange}
                type="text"
                name="secondOption"
                id="secondOption"
                data-testid="secondOption"
              />
            </div>
          </div>

          <div>
            <button type="submit" data-testid="submit-poll">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
