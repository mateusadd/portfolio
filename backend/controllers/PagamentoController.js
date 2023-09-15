const Agendamento = require('../models/Agendamento')
const Pagamento = require('../models/Pagamento')

module.exports = {

    async create(req, res) {

        const pagamento = {
            agendamento_id: req.body.agendamento_id,
            pagamento_valor: req.body.pagamento_valor,
            dividido: req.body.dividido,
            pagamento_metodo: req.body.pagamento_metodo,
            valor_dividido: req.body.valor_dividido
        }

        const pagamentoCriado = await Pagamento.create(pagamento)
        return res.json(pagamentoCriado)

    },

    async read(req, res) {

        try {

            const registers = await Pagamento.findAll({
                include: [{
                    model: Agendamento,
                    as: 'agendamento',
                    attributes: ['agendamento_id', 'cliente_id', 'servico_id', 'funcionario_id', 'agendamento_data', 'pago']
                }]
            })
            return res.json(registers)

        } catch (error) {

            console.log(error)
            
        }

    },

    async update(req, res) {

        const pagamento = await Pagamento.findOne({where: {pagamento_id: req.params.pagamento_id}})

        pagamento.pagamento_id = req.body.pagamento_id
        pagamento.pagamento_valor = req.body.pagamento_valor
        pagamento.dividido = req.body.dividido
        pagamento.pagamento_metodo = req.body.pagamento_metodo
        pagamento.valor_dividido = req.body.valor_dividido

        await pagamento.save()

        return res.json(pagamento)

    },

    async delete(req, res) {

        await Pagamento.destroy({where: {pagamento_id: req.params.pagamento_id}})

        return res.json({ msg:`${req.params.pagamento_id} deleted successfully!` })

    }

}