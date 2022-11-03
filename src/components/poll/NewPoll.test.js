import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";

describe("NewPoll", () => {
  it("should render the component", () => {
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

  it("should show a 404 page", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const errorCode = component.getByTestId("error-code");
    expect(errorCode).toBeDefined();
    expect(errorCode).toHaveTextContent("404");

    const navbarDropdown = component.getByTestId("navbarDropdown");
    fireEvent.click(navbarDropdown);
  });
});
