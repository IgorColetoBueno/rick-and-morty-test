import { render } from "@testing-library/react-native";
import React from "react";

import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);
  });
});
