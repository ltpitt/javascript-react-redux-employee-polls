import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../../actions/shared";
import Home from "../home/Home";
import "bootstrap/dist/css/bootstrap.css";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return <div>{props.loading === true ? null : <Home />}</div>;
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect()(App);
