import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Auth from "../auth/Auth";
import Home from "../home/Home";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return (
    <Fragment>
      {/* <LoadingBar /> // TODO IMPLEMENT REDUCERS / ACTIONS */}
      <div className="container">
        {props.loading === true ? null : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
