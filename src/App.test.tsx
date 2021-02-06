import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Render Search Bar", () => {
  render(<App />);
  screen.findByPlaceholderText("Enter Github Username...");
  screen.findByText("Search GitHub Repos");
});

test("Render Darkmode switch ", () => {
  render(<App />);
  screen.findAllByRole("checkbox");
});
