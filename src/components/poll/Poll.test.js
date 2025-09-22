import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import React from "react";
import Poll from "./Poll";
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import authedUserReducer from '../../reducers/authedUser';
import usersReducer from '../../reducers/users';
import questionsReducer from '../../reducers/questions';

const mockQuestion = {
  id: 'q1',
  author: 'sarahedo',
  timestamp: 1467166872634,
  optionOne: {
    votes: [],
    text: 'have horrible short term memory'
  },
  optionTwo: {
    votes: [],
    text: 'have horrible long term memory'
  }
};

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    password: 'password123',
    avatarURL: 'test-avatar.jpg'
  }
};

const createMockStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    authedUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer,
  });
  
  return createStore(rootReducer, {
    authedUser: 'tylermcginnis',
    users: mockUsers,
    questions: {
      q1: mockQuestion
    },
    ...initialState
  });
};

// Mock the Nav component
jest.mock('../../components/nav/Nav', () => {
  return function Nav() {
    return <div data-testid="nav">Navigation</div>;
  };
});

// Mock PageNotFound component
jest.mock('../page_not_found/PageNotFound', () => {
  return function PageNotFound() {
    return <div data-testid="page-not-found">Page Not Found</div>;
  };
});

// Mock react-router hooks
const mockParams = { id: 'q1' };
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => mockParams,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/questions/q1' }),
}));

describe("Poll Component", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore();
    jest.clearAllMocks();
  });

  it("should render and match snapshot", () => {
    const component = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Poll />
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
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it("should display poll information when question exists", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Poll by sarahedo')).toBeInTheDocument();
    expect(screen.getByText('Would You Rather')).toBeInTheDocument();
    expect(screen.getByText('have horrible short term memory')).toBeInTheDocument();
    expect(screen.getByText('have horrible long term memory')).toBeInTheDocument();
  });

  it("should display voting buttons when question is not answered", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    const optionOneButton = screen.getByRole('button', { name: /have horrible short term memory/i });
    const optionTwoButton = screen.getByRole('button', { name: /have horrible long term memory/i });

    expect(optionOneButton).toBeInTheDocument();
    expect(optionTwoButton).toBeInTheDocument();
    expect(optionOneButton).not.toBeDisabled();
    expect(optionTwoButton).not.toBeDisabled();
  });

  it("should handle voting for option one", () => {
    const mockDispatch = jest.fn();
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    const optionOneButton = screen.getByRole('button', { name: /have horrible short term memory/i });
    fireEvent.click(optionOneButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should handle voting for option two", () => {
    const mockDispatch = jest.fn();
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    const optionTwoButton = screen.getByRole('button', { name: /have horrible long term memory/i });
    fireEvent.click(optionTwoButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should display statistics when question is answered", () => {
    const answeredQuestion = {
      ...mockQuestion,
      optionOne: {
        ...mockQuestion.optionOne,
        votes: ['tylermcginnis']
      }
    };

    const answeredStore = createMockStore({
      questions: {
        q1: answeredQuestion
      }
    });

    render(
      <Provider store={answeredStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Statistics :')).toBeInTheDocument();
    expect(screen.getByText('Votes: 1')).toBeInTheDocument();
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });

  it("should disable buttons when question is answered", () => {
    const answeredQuestion = {
      ...mockQuestion,
      optionOne: {
        ...mockQuestion.optionOne,
        votes: ['tylermcginnis']
      }
    };

    const answeredStore = createMockStore({
      questions: {
        q1: answeredQuestion
      }
    });

    render(
      <Provider store={answeredStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    const optionOneButton = screen.getByRole('button', { name: /have horrible short term memory/i });
    const optionTwoButton = screen.getByRole('button', { name: /have horrible long term memory/i });

    expect(optionOneButton).toBeDisabled();
    expect(optionTwoButton).toBeDisabled();
  });

  it("should show PageNotFound when question does not exist", () => {
    // Mock params for non-existent question
    jest.doMock('react-router', () => ({
      ...jest.requireActual('react-router'),
      useParams: () => ({ id: 'nonexistent' }),
      useNavigate: () => jest.fn(),
      useLocation: () => ({ pathname: '/questions/nonexistent' }),
    }));

    const emptyStore = createMockStore({
      questions: {}
    });

    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });

  it("should calculate percentages correctly with multiple votes", () => {
    const multiVoteQuestion = {
      ...mockQuestion,
      optionOne: {
        ...mockQuestion.optionOne,
        votes: ['tylermcginnis', 'mtsamis']
      },
      optionTwo: {
        ...mockQuestion.optionTwo,
        votes: ['sarahedo']
      }
    };

    const multiVoteStore = createMockStore({
      authedUser: 'tylermcginnis',
      questions: {
        q1: multiVoteQuestion
      }
    });

    render(
      <Provider store={multiVoteStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Votes: 2')).toBeInTheDocument();
    expect(screen.getByText('Votes: 1')).toBeInTheDocument();
    expect(screen.getByText(/66.7%/)).toBeInTheDocument();
    expect(screen.getByText(/33.3%/)).toBeInTheDocument();
  });

  it("should highlight voted option", () => {
    const votedQuestion = {
      ...mockQuestion,
      optionOne: {
        ...mockQuestion.optionOne,
        votes: ['tylermcginnis']
      }
    };

    const votedStore = createMockStore({
      questions: {
        q1: votedQuestion
      }
    });

    render(
      <Provider store={votedStore}>
        <BrowserRouter>
          <Poll />
        </BrowserRouter>
      </Provider>
    );

    const optionOneButton = screen.getByRole('button', { name: /have horrible short term memory/i });
    expect(optionOneButton).toHaveClass('button-voted');
  });
});