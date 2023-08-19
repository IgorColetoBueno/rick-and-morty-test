import React, { PropsWithChildren, ReactNode } from "react";
import { render } from "@testing-library/react-native";
import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    const { getByText } = render(<App />);

    // Test if HomeScreen is rendered
    expect(getByText("Home")).toBeTruthy();
  });

  // You can add more tests here
});
