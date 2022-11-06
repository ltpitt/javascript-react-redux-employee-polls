import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";

describe("NewPoll", () => {
  it("should render the NewPoll", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should render and match snapshot", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display all elements", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInputElement = component.getByTestId("firstOption");
    const secondOptionInputElement = component.getByTestId("secondOption");
    const firstOptionLabelElement = component.getByTestId("firstOptionLabel");
    const secondOptionLabelElement = component.getByTestId("secondOptionLabel");
    const submitButtonElement = component.getByTestId("submit-poll");

    expect(firstOptionInputElement).toBeTruthy();
    expect(secondOptionInputElement).toBeTruthy();
    expect(firstOptionLabelElement).toBeTruthy();
    expect(secondOptionLabelElement).toBeTruthy();
    expect(submitButtonElement).toBeTruthy();
  });

  it("should allow to type first option", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInputElement = component.getByTestId("firstOption");
    expect(firstOptionInputElement).toHaveValue("");

    fireEvent.change(firstOptionInputElement, { target: { value: "Meters" } });
    expect(firstOptionInputElement.value).toBe("Meters");
  });

  it("should allow to type second option", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const secondOptionInputElement = component.getByTestId("secondOption");
    expect(secondOptionInputElement).toHaveValue("");

    fireEvent.change(secondOptionInputElement, { target: { value: "Feet" } });
    expect(secondOptionInputElement.value).toBe("Feet");
  });
});
