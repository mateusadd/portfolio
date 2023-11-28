const AgendamentoController = require('../controllers/AgendamentoController');
const Agendamento = require('../models/Agendamento');
const Cliente = require('../models/Cliente');
const Servico = require('../models/Servico');
const Funcionario = require('../models/Funcionario');

jest.mock('../models/Agendamento');
jest.mock('../models/Cliente');
jest.mock('../models/Servico');
jest.mock('../models/Funcionario');

describe('AgendamentoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new agendamento', async () => {
      const req = {
        body: {
          cliente_id: 1,
          servico_id: 2,
          funcionario_id: 3,
          agendamento_datetime_start: '2023-01-01T12:00:00.000Z',
          agendamento_datetime_end: '2023-01-01T12:30:00.000Z',
          pago: true,
        },
      };
      const res = { json: jest.fn() };

      Agendamento.create.mockResolvedValueOnce({ agendamento_id: 1 });

      await AgendamentoController.create(req, res);

      expect(Agendamento.create).toHaveBeenCalledWith({
        cliente_id: 1,
        servico_id: 2,
        funcionario_id: 3,
        agendamento_datetime_start: new Date('2023-01-01T12:00:00.000Z'),
        agendamento_datetime_end: '2023-01-01T12:30:00.000Z',
        pago: true,
      });
      expect(res.json).toHaveBeenCalledWith({ agendamento_id: 1 });
    });

    it('should handle errors during agendamento creation', async () => {
      const req = { body: {} };
      const res = { json: jest.fn() };

      Agendamento.create.mockRejectedValueOnce(new Error('Failed to create agendamento'));

      await expect(AgendamentoController.create(req, res)).rejects.toThrow('Failed to create agendamento');
      expect(Agendamento.create).toHaveBeenCalledWith(expect.any(Object));
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('read', () => {
    it('should retrieve all agendamentos with related data', async () => {
      const req = {};
      const res = { json: jest.fn() };

      Agendamento.findAll.mockResolvedValueOnce([
        { agendamento_id: 1, cliente: { cliente_id: 1, cliente_nome: 'Cliente1' }, /* ... outras propriedades */ },
        { agendamento_id: 2, cliente: { cliente_id: 2, cliente_nome: 'Cliente2' }, /* ... outras propriedades */ },
      ]);

      await AgendamentoController.read(req, res);

      expect(Agendamento.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([
        { agendamento_id: 1, cliente_id: 1, cliente_nome: 'Cliente1', /* ... outras propriedades */ },
        { agendamento_id: 2, cliente_id: 2, cliente_nome: 'Cliente2', /* ... outras propriedades */ },
      ]);
    });

    it('should handle errors during agendamento retrieval', async () => {
      const req = {};
      const res = { json: jest.fn() };

      Agendamento.findAll.mockRejectedValueOnce(new Error('Failed to retrieve agendamentos'));

      await expect(AgendamentoController.read(req, res)).rejects.toThrow('Failed to retrieve agendamentos');
      expect(Agendamento.findAll).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing agendamento', async () => {
      const req = {
        params: { agendamento_id: 1 },
        body: {
          cliente_id: 4,
          servico_id: 5,
          funcionario_id: 6,
          agendamento_datetime_start: '2023-01-01T14:00:00.000Z',
        },
      };
      const res = { json: jest.fn() };

      Agendamento.findOne.mockResolvedValueOnce({
        agendamento_id: 1,
        save: jest.fn(),
      });

      await AgendamentoController.update(req, res);

      expect(Agendamento.findOne).toHaveBeenCalledWith({
        where: { agendamento_id: 1 },
      });
      expect(Agendamento.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        agendamento_id: 1,
        cliente_id: 4,
        servico_id: 5,
        funcionario_id: 6,
        agendamento_datetime_start: new Date('2023-01-01T14:00:00.000Z'),
        agendamento_datetime_end: expect.any(Date),
      });
    });

    it('should handle errors during agendamento update', async () => {
      const req = { params: { agendamento_id: 1 }, body: {} };
      const res = { json: jest.fn() };

      Agendamento.findOne.mockResolvedValueOnce({
        agendamento_id: 1,
        save: jest.fn().mockRejectedValueOnce(new Error('Failed to update agendamento')),
      });

      await expect(AgendamentoController.update(req, res)).rejects.toThrow('Failed to update agendamento');
      expect(Agendamento.findOne).toHaveBeenCalledWith({ where: { agendamento_id: 1 } });
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete an existing agendamento', async () => {
      const req = { params: { agendamento_id: 1 } };
      const res = { json: jest.fn() };

      await AgendamentoController.delete(req, res);

      expect(Agendamento.destroy).toHaveBeenCalledWith({ where: { agendamento_id: 1 } });
      expect(res.json).toHaveBeenCalledWith({ msg: '1 deleted successfully!' });
    });

    it('should handle errors during agendamento deletion', async () => {
      const req = { params: { agendamento_id: 1 } };
      const res = { json: jest.fn() };

      Agendamento.destroy.mockRejectedValueOnce(new Error('Failed to delete agendamento'));

      await expect(AgendamentoController.delete(req, res)).rejects.toThrow('Failed to delete agendamento');
      expect(Agendamento.destroy).toHaveBeenCalledWith({ where: { agendamento_id: 1 } });
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
