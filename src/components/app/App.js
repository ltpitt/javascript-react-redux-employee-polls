import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../../actions/shared";
import Home from "../home/Home";
import Poll from "../poll/Poll";
import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Leaderboard from "../leaderboard/Leaderboard";
import NewPoll from "../poll/NewPoll";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/leaderboard", element: <Leaderboard /> },
    { path: "/questions/:id", element: <Poll /> },
    { path: "/new", element: <NewPoll /> },
  ]);

  return element;
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect()(App);
