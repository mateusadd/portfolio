const ServicoController = require('../controllers/ServicoController'); // Ajuste conforme necessário
const Servico = require('../models/Servico'); // Ajuste conforme necessário

describe('Testes do Servico Controller', () => {
  let servicoId;

  // Teste de criação de serviço
  it('Deve criar um serviço', async () => {
    const req = {
      body: {
        servico_nome: 'TesteNome',
        servico_preco: 50,
        servico_comissao: 40,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ServicoController.create(req, res);
    expect(res.json).toHaveBeenCalled();

    // Guarde o ID do serviço para testes futuros
    servicoId = res.json.mock.calls[0][0].servico_id;
  });

  // Teste de leitura de serviços
  it('Deve listar todos os serviços', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    await ServicoController.read(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de atualização de serviço
  it('Deve atualizar um serviço existente', async () => {
    const req = {
      params: {
        servico_id: servicoId,
      },
      body: {
        servico_nome: 'NovoNome',
        servico_preco: 60,
        servico_comissao: 50,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ServicoController.update(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de exclusão de serviço
  it('Deve excluir um serviço existente', async () => {
    const req = {
      params: {
        servico_id: servicoId,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ServicoController.delete(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
