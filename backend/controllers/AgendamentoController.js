const Cliente = require('../models/Cliente')
const Servico = require('../models/Servico')
const Funcionario = require('../models/Funcionario')
const Agendamento = require('../models/Agendamento')

module.exports = {

    async create(req, res) {

        const agendamento = {
            cliente_id: req.body.cliente_id,
            servico_id: req.body.servico_id,
            funcionario_id: req.body.funcionario_id,
            agendamento_datetime_start: req.body.agendamento_datetime_start,
            agendamento_datetime_end: req.body.agendamento_datetime_end,
            pago: req.body.pago
        }

        const agendamentoCriado = await Agendamento.create(agendamento)
        return res.json(agendamentoCriado)

    },

    async read(req, res) {

        try {

            const registers = await Agendamento.findAll({
                include: [{
                    model: Cliente,
                    as: 'cliente',
                    attributes: ['cliente_id', 'cliente_nome']
                }, 
                {
                    model: Servico,
                    as: 'servico',
                    attributes: ['servico_id', 'servico_nome']
                }, 
                {
                    model: Funcionario,
                    as: 'funcionario',
                    attributes: ['funcionario_id', 'funcionario_nome']
                }]
            })
            return res.json(registers)

        } catch (error) {

            console.log(error)
            
        }

    },

    async update(req, res) {

        const agendamento = await Agendamento.findOne({where: {agendamento_id: req.params.agendamento_id}})

        agendamento.cliente_id = req.body.cliente_id
        agendamento.servico_id = req.body.servico_id
        agendamento.funcionario_id = req.body.funcionario_id
        agendamento.agendamento_datetime_start = req.body.agendamento_datetime_start
        agendamento.agendamento_datetime_end = req.body.agendamento_datetime_end

        await agendamento.save()

        return res.json(agendamento)

    },

    async delete(req, res) {

        await Agendamento.destroy({where: {agendamento_id: req.params.agendamento_id}})

        return res.json({ msg:`${req.params.agendamento_id} deleted successfully!` })

    }

}