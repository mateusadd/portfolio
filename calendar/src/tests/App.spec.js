import { render, screen, waitFor, act } from '@testing-library/react';
import api from '../services/api'
import App from '../App';

describe('Página inicial', () => {
  it('renders app', () => {
    render(<App />);
  });
  
})
