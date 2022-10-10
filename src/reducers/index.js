import { combineReducers } from "redux";
import authedUser from "../actions/authedUser";
import users from "../actions/users";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  authedUser,
  users,
  loadingBar: loadingBarReducer,
});
