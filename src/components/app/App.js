import {useEffect} from "react";
import {connect} from "react-redux";
import {handleInitialData} from "../../actions/shared";
import Home from "../home/Home";
import Poll from "../poll/Poll";
import {useRoutes} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Leaderboard from "../leaderboard/Leaderboard";
import NewPoll from "../poll/NewPoll";
import PageNotFound from "../page_not_found/PageNotFound";
import Auth from "../auth/Auth";
import PrivateRoute from "../private_route/PrivateRoute";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return useRoutes([
    {path: "/auth", element: <Auth/>, exact: true},
    {
      path: "/",
      element: (
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
      ),
      exact: true,
    },
    {
      path: "/leaderboard",
      element: (
          <PrivateRoute>
            <Leaderboard/>
          </PrivateRoute>
      ),
      exact: true,
    },
    {
      path: "/questions/:id",
      element: (
          <PrivateRoute>
            <Poll/>
          </PrivateRoute>
      ),
    },
    {
      path: "/add",
      element: (
          <PrivateRoute>
            <NewPoll/>
          </PrivateRoute>
      ),
      exact: true,
    },
    {path: "/404", element: <PageNotFound/>, exact: true},
    {path: "*", element: <PageNotFound/>},
  ]);
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
