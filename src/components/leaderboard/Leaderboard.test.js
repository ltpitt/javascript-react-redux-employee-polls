import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import React from "react";
import Leaderboard from "./Leaderboard";
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import authedUserReducer from '../../reducers/authedUser';
import usersReducer from '../../reducers/users';
import questionsReducer from '../../reducers/questions';

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'test-avatar1.jpg',
    answers: {
      'q1': 'optionOne',
      'q2': 'optionTwo'
    },
    questions: ['q3', 'q4', 'q5']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'test-avatar2.jpg',
    answers: {
      'q1': 'optionTwo'
    },
    questions: ['q1', 'q2']
  },
  mtsamis: {
    id: 'mtsamis',
    name: 'Mike Tsamis',
    avatarURL: 'test-avatar3.jpg',
    answers: {},
    questions: ['q6']
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
    questions: {},
    ...initialState
  });
};

// Mock the Nav component
jest.mock('../nav/Nav', () => {
  return function Nav() {
    return <div data-testid="nav">Navigation</div>;
  };
});

describe("Leaderboard Component", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore();
  });

  it("should render and match snapshot", () => {
    const component = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
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
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it("should display leaderboard title", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it("should display table headers", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Questions')).toBeInTheDocument();
    expect(screen.getByText('Answers')).toBeInTheDocument();
  });

  it("should display all users", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Tyler McGinnis')).toBeInTheDocument();
    expect(screen.getByText('Mike Tsamis')).toBeInTheDocument();
  });

  it("should display correct question counts", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    // Sarah has 3 questions
    const sarahRow = screen.getByText('Sarah Edo').closest('tr');
    expect(sarahRow).toHaveTextContent('3');

    // Tyler has 2 questions
    const tylerRow = screen.getByText('Tyler McGinnis').closest('tr');
    expect(tylerRow).toHaveTextContent('2');

    // Mike has 1 question
    const mikeRow = screen.getByText('Mike Tsamis').closest('tr');
    expect(mikeRow).toHaveTextContent('1');
  });

  it("should display correct answer counts", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    // Sarah has 2 answers
    const sarahRow = screen.getByText('Sarah Edo').closest('tr');
    expect(sarahRow).toHaveTextContent('2');

    // Tyler has 1 answer
    const tylerRow = screen.getByText('Tyler McGinnis').closest('tr');
    expect(tylerRow).toHaveTextContent('1');

    // Mike has 0 answers
    const mikeRow = screen.getByText('Mike Tsamis').closest('tr');
    expect(mikeRow).toHaveTextContent('0');
  });

  it("should sort users by total activity (questions + answers)", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    const rows = screen.getAllByRole('row');
    const userRows = rows.slice(1); // Skip header row

    // Sarah should be first (3 questions + 2 answers = 5)
    expect(userRows[0]).toHaveTextContent('Sarah Edo');
    expect(userRows[0]).toHaveTextContent('1'); // Position

    // Tyler should be second (2 questions + 1 answer = 3)
    expect(userRows[1]).toHaveTextContent('Tyler McGinnis');
    expect(userRows[1]).toHaveTextContent('2'); // Position

    // Mike should be third (1 question + 0 answers = 1)
    expect(userRows[2]).toHaveTextContent('Mike Tsamis');
    expect(userRows[2]).toHaveTextContent('3'); // Position
  });

  it("should display user avatars", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    const avatars = screen.getAllByAltText('User avatar');
    expect(avatars).toHaveLength(3);

    expect(avatars[0]).toHaveAttribute('src', 'test-avatar1.jpg');
    expect(avatars[1]).toHaveAttribute('src', 'test-avatar2.jpg');
    expect(avatars[2]).toHaveAttribute('src', 'test-avatar3.jpg');
  });

  it("should handle empty users state", () => {
    const emptyStore = createMockStore({ users: {} });

    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Edo')).not.toBeInTheDocument();
  });

  it("should handle users with no questions or answers", () => {
    const usersWithEmpty = {
      emptyuser: {
        id: 'emptyuser',
        name: 'Empty User',
        avatarURL: 'empty-avatar.jpg',
        answers: {},
        questions: []
      }
    };

    const emptyUserStore = createMockStore({ users: usersWithEmpty });

    render(
      <Provider store={emptyUserStore}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Empty User')).toBeInTheDocument();
    const emptyUserRow = screen.getByText('Empty User').closest('tr');
    expect(emptyUserRow).toHaveTextContent('0'); // No questions
    expect(emptyUserRow).toHaveTextContent('0'); // No answers
  });
});