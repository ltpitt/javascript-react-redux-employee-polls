import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../../actions/shared";
import Home from "../home/Home";
import Poll from "../poll/Poll";
import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Leaderboard from "../leaderboard/Leaderboard";
import NewPoll from "../poll/NewPoll";
import PageNotFound from "../page_not_found/PageNotFound";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/leaderboard", element: <Leaderboard /> },
    { path: "/questions/:id", element: <Poll /> },
    { path: "/new", element: <NewPoll /> },
    { path: "/404", element: <PageNotFound /> },
    { path: "*", element: <PageNotFound /> },
  ]);

  return element;
};

export default connect()(App);
