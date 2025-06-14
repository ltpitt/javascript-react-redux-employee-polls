import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { handleAddQuestion } from "../../actions/questions";
import Nav from "../nav/Nav";

const NewPoll = ({ dispatch }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

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
        <h1>Would You Rather</h1>
        <h3>Create Your Own Poll</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label data-testid="firstOptionLabel">First Option</label>
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
            <label data-testid="secondOptionLabel">Second Option</label>
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

export default connect()(NewPoll);
