import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router";
import React from "react";
import Auth from "./Auth";
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import authedUserReducer from '../../reducers/authedUser';
import usersReducer from '../../reducers/users';
import questionsReducer from '../../reducers/questions';

// Create a mock store for testing with initial state
const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: 'test-avatar.jpg'
  },
  testuser: {
    id: 'testuser',
    password: 'testpass',
    name: 'Test User',
    avatarURL: 'test-avatar2.jpg'
  }
};

const createMockStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    authedUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer,
  });
  
  return createStore(rootReducer, {
    authedUser: null,
    users: mockUsers,
    questions: {},
    ...initialState
  });
};

describe("Auth Component", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore();
  });

  it("should render and match snapshot", () => {
    const component = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display login form elements", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it("should have default username and password values", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    const usernameInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('Enter password');

    expect(usernameInput).toHaveValue('sarahedo');
    expect(passwordInput).toHaveValue('password123');
  });

  it("should allow typing in username field", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    const usernameInput = screen.getByRole('textbox');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput).toHaveValue('testuser');
  });

  it("should allow typing in password field", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Enter password');
    
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
    expect(passwordInput).toHaveValue('newpassword');
  });

  it("should submit form with correct credentials", async () => {
    const mockDispatch = jest.fn();
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    const usernameInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: 'sarahedo' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should redirect when user is already logged in", () => {
    const loggedInStore = createMockStore({ authedUser: 'sarahedo' });

    render(
      <Provider store={loggedInStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    // When logged in, the auth form should not be displayed
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
});
