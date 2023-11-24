const RelatorioPagamentoController = require('../controllers/RelatorioPagamentoController'); // Ajuste conforme necessário

describe('Testes do Relatorio Pagamento - read', () => {
    // Teste de leitura de pagamentos com filtros
  it('Deve listar pagamentos com filtros', async () => {
    const req = {
      query: {
        metodoPagamento: 'Cartão',
        filterStart: '2023-01-01T00:00:00Z',
        filterEnd: '2024-01-01T00:00:00Z',
      },
    };

    const res = {
      json: jest.fn(),
    };

    await RelatorioPagamentoController.read(req, res);
    expect(res.json).toHaveBeenCalled();

    // Adicione mais asserções conforme necessário para verificar os resultados
    // Certifique-se de que os resultados coincidam com os pagamentos esperados
    // Use os IDs armazenados globalmente nos passos anteriores
  });

  it('Não deve retornar pagamentos no período', async () => {
    const req = {
      query: {
        metodoPagamento: 'Cartão',
        filterStart: '9998-01-01T00:00:00Z',
        filterEnd: '9999-01-01T00:00:00Z',
      },
    };

    const res = {
      json: jest.fn(),
    };

    await RelatorioPagamentoController.read(req, res);
    expect(res.json).toHaveBeenCalled();

    // Adicione mais asserções conforme necessário para verificar os resultados
    // Certifique-se de que os resultados coincidam com os pagamentos esperados
    // Use os IDs armazenados globalmente nos passos anteriores
  });

  // Adicione mais testes conforme necessário, como casos sem filtros, etc.
});
