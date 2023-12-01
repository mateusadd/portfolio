import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Agendamento from '../calendar/src/components/Agendamento/Agendamento';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Página agendamentos', () => {
  const clientes = [{ cliente_id: 1, cliente_nome: "Teste", cliente_contato: "99999999", funcionario: false }]
  const servicos = [{ servico_id: 1, servico_nome: "Teste", servico_comissao: 40 }]
  const funcionarios = [{ funcionario_id: 1, funcionario_nome: "Teste", funcionario_cor: "#fff" }]

  const mock = new MockAdapter(axios);
  mock.onGet().reply(200, clientes);

  it('renders agendamento', () => {
    <Router>
      <Agendamento/>
    </Router>
  }); 
  
})
