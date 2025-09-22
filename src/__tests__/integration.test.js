import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import React from "react";
import Auth from "../components/auth/Auth";
import Home from "../components/home/Home";
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import authedUserReducer from '../reducers/authedUser';
import usersReducer from '../reducers/users';
import questionsReducer from '../reducers/questions';

// Mock data for integration tests
const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: 'test-avatar.jpg',
    answers: {},
    questions: []
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    password: 'abc321',
    name: 'Tyler McGinnis',
    avatarURL: 'test-avatar2.jpg',
    answers: {},
    questions: []
  }
};

const mockQuestions = {
  'q1': {
    id: 'q1',
    author: 'sarahedo',
    timestamp: Date.now(),
    optionOne: {
      votes: [],
      text: 'Option 1'
    },
    optionTwo: {
      votes: [],
      text: 'Option 2'
    }
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
    questions: mockQuestions,
    ...initialState
  });
};

// Mock the Nav component
jest.mock('../components/nav/Nav', () => {
  return function Nav() {
    return <div data-testid="nav">Navigation</div>;
  };
});

// Mock Question component
jest.mock('../components/question/Question', () => {
  return function Question({ question }) {
    return <div data-testid={`question-${question.id}`}>{question.optionOne.text}</div>;
  };
});

describe("Application Integration Tests", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore();
  });

  it("should display auth form for unauthenticated users", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it("should allow successful login with valid credentials", () => {
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

  it("should show home page content for authenticated users", () => {
    const authenticatedStore = createMockStore({ authedUser: 'sarahedo' });

    render(
      <Provider store={authenticatedStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByText(/Unanswered questions/)).toBeInTheDocument();
    expect(screen.getByText(/Answered questions/)).toBeInTheDocument();
  });

  it("should handle multiple user interactions", () => {
    const authenticatedStore = createMockStore({ authedUser: 'sarahedo' });

    render(
      <Provider store={authenticatedStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    // Should show both question tabs
    const unansweredButton = screen.getByText(/Unanswered questions/);
    const answeredButton = screen.getByText(/Answered questions/);

    expect(unansweredButton).toBeInTheDocument();
    expect(answeredButton).toBeInTheDocument();

    // Try clicking answered questions tab
    fireEvent.click(answeredButton);
    
    // Both tabs should still be visible
    expect(unansweredButton).toBeInTheDocument();
    expect(answeredButton).toBeInTheDocument();
  });

  it("should maintain state across different components", () => {
    // Start with unauthenticated user
    let currentStore = createMockStore();
    
    const { rerender } = render(
      <Provider store={currentStore}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();

    // Switch to authenticated user
    currentStore = createMockStore({ authedUser: 'sarahedo' });
    
    rerender(
      <Provider store={currentStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
});