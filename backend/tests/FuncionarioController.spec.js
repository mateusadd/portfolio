const FuncionarioController = require('../controllers/FuncionarioController'); // Ajuste conforme necessário
const Funcionario = require('../models/Funcionario'); // Ajuste conforme necessário

describe('Testes do Funcionario Controller', () => {
  let funcionarioId;

  // Teste de criação de funcionário
  it('Deve criar um funcionário', async () => {
    const req = {
      body: {
        funcionario_nome: 'TesteNome',
        funcionario_contato: 'TesteContato',
        funcionario_cor: '#fff',
      },
    };

    const res = {
      json: jest.fn(),
    };

    await FuncionarioController.create(req, res);
    expect(res.json).toHaveBeenCalled();

    // Guarde o ID do funcionário para testes futuros
    funcionarioId = res.json.mock.calls[0][0].funcionario_id;
  });

  // Teste de leitura de funcionários
  it('Deve listar todos os funcionários', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    await FuncionarioController.read(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de atualização de funcionário
  it('Deve atualizar um funcionário existente', async () => {
    const req = {
      params: {
        funcionario_id: funcionarioId,
      },
      body: {
        funcionario_nome: 'NovoNome',
        funcionario_contato: 'NovoContato',
        funcionario_cor: '#fff',
      },
    };

    const res = {
      json: jest.fn(),
    };

    await FuncionarioController.update(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de exclusão de funcionário
  it('Deve excluir um funcionário existente', async () => {
    const req = {
      params: {
        funcionario_id: funcionarioId,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await FuncionarioController.delete(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
