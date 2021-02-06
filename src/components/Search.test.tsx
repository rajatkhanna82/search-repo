import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "./Search";

test("Render Search Bar", () => {
  render(<Search />);
  screen.findByPlaceholderText("Search...");
  screen.findByText("Search GitHub Repos");
});

test("Render Darkmode switch ", () => {
  render(<Search />);
  screen.findAllByRole("checkbox");
});
