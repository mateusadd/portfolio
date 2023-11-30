import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';

describe('Página inicial', () => {
  it('renders app', () => {
    render(<App />);
  });
  
})
