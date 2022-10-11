import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import middleware from "./middleware";

const store = configureStore({
  reducer: allReducers,
  middleware: [middleware],
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
