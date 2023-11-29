import { render, screen, waitFor, act } from '@testing-library/react';
import api from '../services/api'
import App from '../App';

describe('Página inicial', () => {
  it('renders app', () => {
    render(<App />);
  });

  it('fetches data on mount', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce({ data: [] });
  
    await act(async () => {
      render(<App />);
    });
  
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/cliente');
      expect(api.get).toHaveBeenCalledWith('/servico');
      expect(api.get).toHaveBeenCalledWith('/funcionario');
    });
  });  
  
})
