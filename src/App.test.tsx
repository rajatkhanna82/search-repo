import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Render Search Bar', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
