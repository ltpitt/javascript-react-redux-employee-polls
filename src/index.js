import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app/App";

import logger from "./middleware/logger";
import authedUserReducer from "./reducers/authedUser";
import questionsReducer from "./reducers/questions";
import usersReducer from "./reducers/users";

import "./index.css";

const store = configureStore({
  reducer: combineReducers({
    authedUser: authedUserReducer,
    questions: questionsReducer,
    users: usersReducer,
  }),
  middleware: [thunk, logger],
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
