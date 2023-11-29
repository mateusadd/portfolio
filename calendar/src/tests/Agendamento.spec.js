import { render, screen, waitFor, act } from '@testing-library/react';
import api from '../services/api'
import { BrowserRouter as Router } from 'react-router-dom';
import Agendamento from '../components/Agendamento/Agendamento';

describe('Página agendamentos', () => {
  it('renders agendamento', () => {
    render(
        <Router>
            <Agendamento clientes={[]} servicos={[]} funcionarios={[]}/>;
        </Router>
    )
  }); 

  it('Retornando dados de getCalendar', async () => {
   
    jest.spyOn(api, 'get').mockResolvedValueOnce({ data: [] })

    await act(async () => {
        render(
            <Router>
                <Agendamento clientes={[]} servicos={[]} funcionarios={[]}/>;
            </Router>
        )
    });

    await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/agendamento');
    });
  });
  
})
