import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

test('renders app without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // Just test that the app renders without errors
  expect(true).toBe(true);
});
