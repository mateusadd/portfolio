const Agendamento = require('../models/Agendamento')
const Pagamento = require('../models/Pagamento')
const Servico = require('../models/Servico')
const { Op } = require('sequelize');

module.exports = {

    async read(req, res) {

        const {funcionario, filterStart, filterEnd} = req.query

        const agendamentos = await Agendamento.findAll({
            where: {
                funcionario_id: funcionario,
                agendamento_datetime_start: {
                    [Op.between]: [filterStart, filterEnd]
                }
            }
        })

        const idsAgendamentos = agendamentos.map(agendamento => agendamento.agendamento_id)

        const pagamentos = await Pagamento.findAll({
            where: {
                agendamento_id: {
                    [Op.in]: idsAgendamentos
                }
            },
            include: [{
                model: Agendamento,
                as: 'agendamento',
                attributes: ['agendamento_id', 'cliente_id', 'servico_id', 'funcionario_id', 'agendamento_datetime_start', 'pago'],
                include: {
                    model: Servico,
                    as: 'servico',
                    attributes: ['servico_id', 'servico_nome', 'servico_preco', 'servico_comissao']
                }
            }]
        })

        return res.json(pagamentos)

    }

}