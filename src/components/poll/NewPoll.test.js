import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";

const renderWithProviders = (ui) => {
  return render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
  );
};

describe("NewPoll", () => {
  it("should render the NewPoll", () => {
    const component = renderWithProviders(<NewPoll />);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display all elements", () => {
    const { getByTestId } = renderWithProviders(<NewPoll />);
    expect(getByTestId("firstOption")).toBeTruthy();
    expect(getByTestId("secondOption")).toBeTruthy();
    expect(getByTestId("firstOptionLabel")).toBeTruthy();
    expect(getByTestId("secondOptionLabel")).toBeTruthy();
    expect(getByTestId("submit-poll")).toBeTruthy();
  });

  it("should allow typing in first option", () => {
    const { getByTestId } = renderWithProviders(<NewPoll />);
    const input = getByTestId("firstOption");
    expect(input).toHaveValue("");
    fireEvent.change(input, { target: { value: "Meters" } });
    expect(input).toHaveValue("Meters");
  });

  it("should allow typing in second option", () => {
    const { getByTestId } = renderWithProviders(<NewPoll />);
    const input = getByTestId("secondOption");
    expect(input).toHaveValue("");
    fireEvent.change(input, { target: { value: "Feet" } });
    expect(input).toHaveValue("Feet");
  });
});
