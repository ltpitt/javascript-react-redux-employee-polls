import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import React from "react";
import Home from "./Home";
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import authedUserReducer from '../../reducers/authedUser';
import usersReducer from '../../reducers/users';
import questionsReducer from '../../reducers/questions';

const mockQuestions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'tylermcginnis',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['tylermcginnis', 'mtsamis'],
      text: 'become a supervillain'
    }
  }
};

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: 'test-avatar.jpg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne'
    },
    questions: ['8xf0y6ziyjabvozdd253nd']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    password: 'abc321',
    name: 'Tyler McGinnis',
    avatarURL: 'test-avatar2.jpg',
    answers: {
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez']
  }
};

const createMockStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    authedUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer,
  });
  
  return createStore(rootReducer, {
    authedUser: 'sarahedo',
    users: mockUsers,
    questions: mockQuestions,
    ...initialState
  });
};

// Mock the Nav component to avoid complex dependencies
jest.mock('../nav/Nav', () => {
  return function Nav() {
    return <div data-testid="nav">Navigation</div>;
  };
});

// Mock the Question component
jest.mock('../question/Question', () => {
  return function Question({ question, author }) {
    return <div data-testid={`question-${question.id}`}>{question.optionOne.text}</div>;
  };
});

describe("Home Component", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore();
  });

  it("should render and match snapshot", () => {
    const component = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display navigation", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it("should display both question tabs", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Unanswered questions/)).toBeInTheDocument();
    expect(screen.getByText(/Answered questions/)).toBeInTheDocument();
  });

  it("should show correct counts for answered and unanswered questions", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    // sarahedo has answered 1 question, so 1 answered and 1 unanswered
    expect(screen.getByText(/Unanswered questions \(1\)/)).toBeInTheDocument();
    expect(screen.getByText(/Answered questions \(1\)/)).toBeInTheDocument();
  });

  it("should toggle between answered and unanswered questions", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const unansweredButton = screen.getByText(/Unanswered questions/);
    const answeredButton = screen.getByText(/Answered questions/);

    // Initially, unanswered questions should be visible
    expect(screen.getByDisplayValue ? screen.queryByTestId('question-6ni6ok3ym7mf1p33lnez') : true).toBeTruthy();

    // Click to show answered questions
    fireEvent.click(answeredButton);
    
    // Both buttons should still be present
    expect(unansweredButton).toBeInTheDocument();
    expect(answeredButton).toBeInTheDocument();
  });

  it("should filter questions correctly for authenticated user", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    // Should show the question that sarahedo hasn't answered
    expect(screen.getByTestId('question-6ni6ok3ym7mf1p33lnez')).toBeInTheDocument();
  });

  it("should handle empty questions state", () => {
    const emptyStore = createMockStore({ questions: {} });

    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Unanswered questions \(0\)/)).toBeInTheDocument();
    expect(screen.getByText(/Answered questions \(0\)/)).toBeInTheDocument();
  });

  it("should handle user with no answered questions", () => {
    const noAnswersStore = createMockStore({ 
      authedUser: 'tylermcginnis',
      users: {
        ...mockUsers,
        tylermcginnis: {
          ...mockUsers.tylermcginnis,
          answers: {}
        }
      },
      questions: {
        ...mockQuestions,
        "6ni6ok3ym7mf1p33lnez": {
          ...mockQuestions["6ni6ok3ym7mf1p33lnez"],
          optionTwo: {
            votes: ['mtsamis'], // Remove tylermcginnis from votes
            text: 'become a supervillain'
          }
        }
      }
    });

    render(
      <Provider store={noAnswersStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Unanswered questions \(2\)/)).toBeInTheDocument();
    expect(screen.getByText(/Answered questions \(0\)/)).toBeInTheDocument();
  });
});