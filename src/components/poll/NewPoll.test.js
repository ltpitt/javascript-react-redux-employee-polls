import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router";
import React from "react";
import NewPoll from "./NewPoll";
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
    authedUser: 'sarahedo',
    users: {
      sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        password: 'password123'
      }
    },
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

// Mock react-router navigation
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe("NewPoll Component", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore();
    jest.clearAllMocks();
  });

  it("should render and match snapshot", () => {
    const component = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display all form elements", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("firstOption")).toBeInTheDocument();
    expect(screen.getByTestId("secondOption")).toBeInTheDocument();
    expect(screen.getByTestId("firstOptionLabel")).toBeInTheDocument();
    expect(screen.getByTestId("secondOptionLabel")).toBeInTheDocument();
    expect(screen.getByTestId("submit-poll")).toBeInTheDocument();
    expect(screen.getByText("Would You Rather")).toBeInTheDocument();
    expect(screen.getByText("Create Your Own Poll")).toBeInTheDocument();
  });

  it("should have empty input fields initially", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInput = screen.getByTestId("firstOption");
    const secondOptionInput = screen.getByTestId("secondOption");

    expect(firstOptionInput).toHaveValue("");
    expect(secondOptionInput).toHaveValue("");
  });

  it("should allow typing in first option field", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInput = screen.getByTestId("firstOption");
    expect(firstOptionInput).toHaveValue("");

    fireEvent.change(firstOptionInput, { target: { value: "Meters" } });
    expect(firstOptionInput.value).toBe("Meters");
  });

  it("should allow typing in second option field", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const secondOptionInput = screen.getByTestId("secondOption");
    expect(secondOptionInput).toHaveValue("");

    fireEvent.change(secondOptionInput, { target: { value: "Feet" } });
    expect(secondOptionInput.value).toBe("Feet");
  });

  it("should handle form submission with valid inputs", () => {
    const mockDispatch = jest.fn();
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInput = screen.getByTestId("firstOption");
    const secondOptionInput = screen.getByTestId("secondOption");
    const submitButton = screen.getByTestId("submit-poll");

    fireEvent.change(firstOptionInput, { target: { value: "Option 1" } });
    fireEvent.change(secondOptionInput, { target: { value: "Option 2" } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should handle form submission with empty inputs", () => {
    const mockDispatch = jest.fn();
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByTestId("submit-poll");
    fireEvent.click(submitButton);

    // Should still dispatch (validation happens in the action/API layer)
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should have correct input attributes", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInput = screen.getByTestId("firstOption");
    const secondOptionInput = screen.getByTestId("secondOption");

    expect(firstOptionInput).toHaveAttribute("type", "text");
    expect(firstOptionInput).toHaveAttribute("name", "firstOption");
    expect(firstOptionInput).toHaveAttribute("id", "firstOption");

    expect(secondOptionInput).toHaveAttribute("type", "text");
    expect(secondOptionInput).toHaveAttribute("name", "secondOption");
    expect(secondOptionInput).toHaveAttribute("id", "secondOption");
  });

  it("should display navigation component", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
});
