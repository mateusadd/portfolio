import { render, screen, waitFor, act } from '@testing-library/react';
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
  
})
