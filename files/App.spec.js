import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../calendar/src/App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Página inicial', () => {
  it('renders app', () => {

    const clientes = [{ cliente_id: 1, cliente_nome: "Teste", cliente_contato: "99999999", funcionario: false }]
    const servicos = [{ servico_id: 1, servico_nome: "Teste", servico_comissao: 40 }]
    const funcionarios = [{ funcionario_id: 1, funcionario_nome: "Teste", funcionario_cor: "#fff" }]

    const mockClientes = new MockAdapter(axios);
    const mockServicos = new MockAdapter(axios);
    const mockFuncionarios = new MockAdapter(axios);
    mockClientes.onGet().reply(200, clientes);
    mockServicos.onGet().reply(200, servicos);
    mockFuncionarios.onGet().reply(200, funcionarios);

    <Router>
      <App />
    </Router>
  });
  
})
