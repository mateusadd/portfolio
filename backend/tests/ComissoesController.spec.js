const ComissoesController = require('../controllers/ComissoesController'); // Ajuste conforme necessário
const Agendamento = require('../models/Agendamento'); // Ajuste conforme necessário
const Pagamento = require('../models/Pagamento'); // Ajuste conforme necessário
const Servico = require('../models/Servico'); // Ajuste conforme necessário

describe('Testes do Relatório de Comissões- read', () => {

  // Teste de leitura de agendamentos e pagamentos
  it('Deve listar informações sobre comissões com filtros', async () => {
    const req = {
      query: {
        funcionario: 1,
        filterStart: '2023-01-01T00:00:00Z',
        filterEnd: '2024-01-01T00:00:00Z',
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ComissoesController.read(req, res);
    expect(res.json).toHaveBeenCalled();

    // Adicione mais asserções conforme necessário para verificar os resultados
    // Certifique-se de que os resultados coincidam com os agendamentos e pagamentos esperados
    // Use os IDs armazenados globalmente nos passos anteriores
  });

  it('Não deve listar informações sobre comissões com filtros', async () => {
    const req = {
      query: {
        funcionario: 1,
        filterStart: '9998-01-01T00:00:00Z',
        filterEnd: '9999-01-01T00:00:00Z',
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ComissoesController.read(req, res);
    expect(res.json).toHaveBeenCalled();

    // Adicione mais asserções conforme necessário para verificar os resultados
    // Certifique-se de que os resultados coincidam com os agendamentos e pagamentos esperados
    // Use os IDs armazenados globalmente nos passos anteriores
  });

  // Adicione mais testes conforme necessário, como casos sem filtros, etc.
});
