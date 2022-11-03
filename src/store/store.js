import { configureStore } from "@reduxjs/toolkit";
import authedUserReducer from "../reducers/authedUser";
import questionsReducer from "../reducers/questions";
import usersReducer from "../reducers/users";
import logger from "../middleware/logger";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: combineReducers({
    authedUser: authedUserReducer,
    questions: questionsReducer,
    users: usersReducer,
  }),
  middleware: [thunk, logger],
});
