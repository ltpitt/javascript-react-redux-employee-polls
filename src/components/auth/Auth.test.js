import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router";
import React from "react";
import Auth from "./Auth";

describe("Login", () => {
  it("should render and match snapshot", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
