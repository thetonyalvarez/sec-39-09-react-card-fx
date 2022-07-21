import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import { expect, it, describe } from 'vitest'
import App from './App'
import PlayingCard from './PlayingCard'

// smoke test
it("renders without crashing", function() {
  render(<App />)
});

// snapshot
it("matches snapshot", function() {
  const {asFragment} = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

it("should render Deal New Card button", function() {
  const { getByTestId } = render(<App />)
  
  const dealBtn = getByTestId('deal-btn')
  const text = within(dealBtn).getByText('Start Drawing Cards')

  expect(text).toBeVisible()
});