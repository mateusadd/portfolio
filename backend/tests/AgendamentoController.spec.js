const AgendamentoController = require('../controllers/AgendamentoController'); // Ajuste conforme necessário
const Agendamento = require('../models/Agendamento'); // Ajuste conforme necessário
const Cliente = require('../models/Cliente'); // Ajuste conforme necessário
const Servico = require('../models/Servico'); // Ajuste conforme necessário
const Funcionario = require('../models/Funcionario'); // Ajuste conforme necessário

describe('Testes do Agendamento Controller', () => {
  let agendamentoId;

  // Teste de criação de agendamento
  it('Deve criar um agendamento', async () => {
    const req = {
      body: {
        cliente_id: 1, // Substitua com um ID de cliente válido
        servico_id: 1, // Substitua com um ID de serviço válido
        funcionario_id: 1, // Substitua com um ID de funcionário válido
        agendamento_datetime_start: '2023-01-01T12:00:00Z', // Substitua com uma data e hora válida
        agendamento_datetime_end: '2023-01-01T13:00:00Z', // Substitua com uma data e hora válida
        pago: false,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await AgendamentoController.create(req, res);
    expect(res.json).toHaveBeenCalled();

    // Guarde o ID do agendamento para testes futuros
    agendamentoId = res.json.mock.calls[0][0].agendamento_id;
  });

  // Teste de leitura de agendamentos
  it('Deve listar todos os agendamentos', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    await AgendamentoController.read(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de atualização de agendamento
  it('Deve atualizar um agendamento existente', async () => {
    const req = {
      params: {
        agendamento_id: agendamentoId,
      },
      body: {
        cliente_id: 2, // Substitua com um novo ID de cliente válido
        servico_id: 2, // Substitua com um novo ID de serviço válido
        funcionario_id: 2, // Substitua com um novo ID de funcionário válido
        agendamento_datetime_start: '2023-02-01T14:00:00Z', // Substitua com uma nova data e hora válida
        agendamento_datetime_end: '2023-02-01T15:00:00Z', // Substitua com uma nova data e hora válida
        pago: true,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await AgendamentoController.update(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de exclusão de agendamento
  it('Deve excluir um agendamento existente', async () => {
    const req = {
      params: {
        agendamento_id: agendamentoId,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await AgendamentoController.delete(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
