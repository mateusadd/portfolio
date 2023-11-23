const Cliente = require('../models/Cliente')

module.exports = {

    async create(req, res) {

        const cliente = {
            cliente_nome: req.body.cliente_nome,
            cliente_contato: req.body.cliente_contato,
            funcionario: req.body.funcionario,
        }

        const registers = await Cliente.create(cliente)
        return res.json(registers)

    },

    async read(req, res) {

        try {
            const registers = await Cliente.findAll()

            return res.json(registers)
        } catch (error) {
            console.log(error)
        }

    },

    async update(req, res) {

        const cliente = await Cliente.findOne({where: {cliente_id: req.params.cliente_id}})

        cliente.cliente_nome = req.body.cliente_nome
        cliente.cliente_contato = req.body.cliente_contato
        cliente.funcionario = req.body.funcionario

        await cliente.save()

        return res.json(cliente)

    },

    async delete(req, res) {
        try {
            await Cliente.destroy({where: {cliente_id: req.params.cliente_id}})

            return res.json({msg:`${req.params.cliente_id} deleted successfully!`})
        } catch (error) {
            console.log(error)
        }
    }

}