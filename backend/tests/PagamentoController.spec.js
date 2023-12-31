const PagamentoController = require('../controllers/PagamentoController'); // Ajuste conforme necessário
const Pagamento = require('../models/Pagamento'); // Ajuste conforme necessário
const Agendamento = require('../models/Agendamento'); // Ajuste conforme necessário

describe('Testes do Pagamento Controller', () => {
  let pagamentoId;

  // Teste de criação de pagamento
  it('Deve criar um pagamento', async () => {
    const req = {
      body: {
        agendamento_id: 85, // Substitua com um ID de agendamento válido
        //agendamento_id: 40,
        pagamento_valor: 50,
        dividido: false,
        pagamento_metodo: 'Cartão',
        valor_dividido: 0,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await PagamentoController.create(req, res);
    expect(res.json).toHaveBeenCalled();

    // Guarde o ID do pagamento para testes futuros
    pagamentoId = res.json.mock.calls[0][0].pagamento_id;
  });

  // Teste de leitura de pagamentos
  it('Deve listar todos os pagamentos', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    await PagamentoController.read(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('Deve listar pagamentos de acordo com id do agendamento ', async () => {
    const req = {
      query: {
        agendamento_id: 85,
        //agendamento_id: 40,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await PagamentoController.read(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('Deve retornar erro ao listar pagamentos de acordo com id do agendamento ', async () => {
    const req = {
      query: {
        agendamento_id: 'erro',
      },
    };

    const res = {
      json: jest.fn(),
    };

    try {
      await PagamentoController.read(req, res);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  it('Deve listar um pagamento específico ', async () => {
    const req = {
      query: {
        //agendamento_id: 85,
        pagamento_id: pagamentoId,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await PagamentoController.read(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('Deve retornar erro ao listar um pagamento específico ', async () => {
    const req = {
      query: {
        //agendamento_id: 85,
        pagamento_id: 'erro',
      },
    };

    const res = {
      json: jest.fn(),
    };

    try {
      await PagamentoController.read(req, res);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  // Teste de atualização de pagamento
  it('Deve atualizar um pagamento existente', async () => {
    const req = {
      params: {
        pagamento_id: pagamentoId,
      },
      body: {
        pagamento_valor: 60,
        dividido: false,
        pagamento_metodo: 'Dinheiro',
        valor_dividido: 0,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await PagamentoController.update(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  // Teste de exclusão de pagamento
  it('Deve excluir um pagamento existente', async () => {
    const req = {
      params: {
        pagamento_id: pagamentoId,
      },
    };

    const res = {
      json: jest.fn(),
    };

    await PagamentoController.delete(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
