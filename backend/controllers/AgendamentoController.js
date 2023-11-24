const Cliente = require('../models/Cliente')
const Servico = require('../models/Servico')
const Funcionario = require('../models/Funcionario')
const Agendamento = require('../models/Agendamento')

module.exports = {

    async create(req, res) {

        let newDate = new Date(req.body.agendamento_datetime_start);
        newDate.setHours(newDate.getHours() + 3);

        const agendamento = {
            cliente_id: req.body.cliente_id,
            servico_id: req.body.servico_id,
            funcionario_id: req.body.funcionario_id,
            agendamento_datetime_start: newDate,
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
                    attributes: ['servico_id', 'servico_nome', 'servico_preco']
                }, 
                {
                    model: Funcionario,
                    as: 'funcionario',
                    attributes: ['funcionario_id', 'funcionario_nome', 'funcionario_cor']
                }]
            })
            return res.json(registers)

        } catch (error) {

            console.log(error)
            
        }

    },

    async update(req, res) {

        const agendamento = await Agendamento.findOne({where: {agendamento_id: req.params.agendamento_id}})

        let newDate = new Date(req.body.agendamento_datetime_start);
        newDate.setHours(newDate.getHours() + 3);
        let newDateEnd = new Date(req.body.agendamento_datetime_end)
        newDateEnd.setHours(newDateEnd.getHours() + 3);

        agendamento.cliente_id = req.body.cliente_id
        agendamento.servico_id = req.body.servico_id
        agendamento.funcionario_id = req.body.funcionario_id
        agendamento.agendamento_datetime_start = newDate
        agendamento.agendamento_datetime_end = newDateEnd

        await agendamento.save()

        return res.json(agendamento)

    },

    async delete(req, res) {

        await Agendamento.destroy({where: {agendamento_id: req.params.agendamento_id}})

        return res.json({ msg:`${req.params.agendamento_id} deleted successfully!` })

    }

}