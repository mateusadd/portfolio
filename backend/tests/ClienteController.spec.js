const ClienteController = require('../controllers/ClienteController'); // Ajuste conforme necessário
const Cliente = require('../models/Cliente'); // Ajuste conforme necessário

describe('Testes do Cliente Controller', () => {
  let clienteId;

  // Teste de criação de cliente
  it('Deve criar um cliente', async () => {
    const req = {
      body: {
        cliente_nome: 'TesteNome',
        cliente_contato: 'TesteContato',
        funcionario: false,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ClienteController.create(req, res);
    expect(res.json).toHaveBeenCalled();

    // Guarde o ID do cliente para testes futuros
    clienteId = res.json.mock.calls[0][0].cliente_id;
  });

  // Teste de leitura de clientes
  it('Deve listar todos os clientes', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    await ClienteController.read(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de atualização de cliente
  it('Deve atualizar um cliente existente', async () => {
    const req = {
      params: {
        cliente_id: clienteId,
      },
      body: {
        cliente_nome: 'NovoNome',
        cliente_contato: 'NovoContato',
        funcionario: false,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ClienteController.update(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de exclusão de cliente
  it('Deve excluir um cliente existente', async () => {
    const req = {
      params: {
        cliente_id: clienteId,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await ClienteController.delete(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
