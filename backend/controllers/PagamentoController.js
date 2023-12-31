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

        const agendamento = await Agendamento.findOne({where: {agendamento_id: req.body.agendamento_id}})
        agendamento.pago = 1
        await agendamento.save()

        return res.json(pagamentoCriado)

    },

    async read(req, res) {

            if(req.query?.agendamento_id) {
                try {
    
                    const registers = await Pagamento.findAll({
                        where: {
                            agendamento_id: req.query.agendamento_id
                        },
                        include: [{
                            model: Agendamento,
                            as: 'agendamento',
                            attributes: ['agendamento_id', 'cliente_id', 'servico_id', 'funcionario_id', 'agendamento_datetime_start', 'pago']
                        }]
                    })
                    return res.json(registers)
        
                } catch (error) {
        
                    console.log(error)
                    
                }
            } else if (req.query?.pagamento_id) {
                try {
    
                    const registers = await Pagamento.findAll({
                        where: {
                            pagamento_id: req.query.pagamento_id
                        },
                        include: [{
                            model: Agendamento,
                            as: 'agendamento',
                            attributes: ['agendamento_id', 'cliente_id', 'servico_id', 'funcionario_id', 'agendamento_datetime_start', 'pago']
                        }]
                    })
                    return res.json(registers)
        
                } catch (error) {
        
                    console.log(error)
                    throw error;

                }
            } else {
                try {
    
                    const registers = await Pagamento.findAll({
                        include: [{
                            model: Agendamento,
                            as: 'agendamento',
                            attributes: ['agendamento_id', 'cliente_id', 'servico_id', 'funcionario_id', 'agendamento_datetime_start', 'pago']
                        }]
                    })
                    return res.json(registers)
        
                } catch (error) {
        
                    console.log(error)
                    throw error;

                }
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

        //const agendamento = await Agendamento.findOne({where: {agendamento_id: req.body.agendamento_id}})
        //agendamento.pago = 0
        //await agendamento.save()

        return res.json({ msg:`${req.params.pagamento_id} deleted successfully!` })

    }

}