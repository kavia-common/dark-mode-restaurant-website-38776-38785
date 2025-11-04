import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site brand name', () => {
  render(<App />);
  const brand = screen.getByText(/Ocean Bistro/i);
  expect(brand).toBeInTheDocument();
});

test('has dark mode toggle button', () => {
  render(<App />);
  const btn = screen.getByRole('button', { name: /switch to (dark|light) mode/i });
  expect(btn).toBeInTheDocument();
});
