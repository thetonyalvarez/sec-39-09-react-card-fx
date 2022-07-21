import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import { expect, it, describe } from 'vitest'
import PlayingCard from './PlayingCard'

// smoke test
it("renders without crashing", function() {
  render(<PlayingCard />)
});

// snapshot
it("matches snapshot", function() {
  const {asFragment} = render(<PlayingCard />);
  expect(asFragment()).toMatchSnapshot();
});

it("should render an image within the PlayingCard component", function() {
  const { getByTestId } = render(<PlayingCard />)
  
  const playingCard = getByTestId('PlayingCard')
  const img = within(playingCard).getByRole('img')

  expect(img).toBeVisible()
})