import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const fetchButton = screen.getByText('Fetch My Data!');
  userEvent.click(fetchButton);
});
