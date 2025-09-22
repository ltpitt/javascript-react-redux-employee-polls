import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import authedUserReducer from '../../reducers/authedUser';
import usersReducer from '../../reducers/users';
import questionsReducer from '../../reducers/questions';

const createMockStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    authedUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer,
  });
  
  return createStore(rootReducer, {
    authedUser: null,
    users: {},
    questions: {},
    ...initialState
  });
};

const TestComponent = () => <div>Protected Content</div>;

describe("PrivateRoute Component", () => {
  it("should render children when user is logged in", () => {
    const loggedInStore = createMockStore({ authedUser: 'sarahedo' });

    render(
      <Provider store={loggedInStore}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it("should redirect to auth when user is not logged in", () => {
    const notLoggedInStore = createMockStore({ authedUser: null });

    render(
      <Provider store={notLoggedInStore}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    // The protected content should not be rendered
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it("should handle undefined authedUser", () => {
    const undefinedStore = createMockStore({ authedUser: undefined });

    render(
      <Provider store={undefinedStore}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});