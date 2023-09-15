const Cliente = require('../models/Cliente')

module.exports = {

    async create(req, res) {

        const cliente = {
            cliente_nome: req.body.cliente_nome,
            cliente_contato: req.body.cliente_contato,
            funcionario: req.body.funcionario,
        }

        await Cliente.create(cliente)
        return res.json({msg : `criado com sucesso`})

    },

    async read(req, res) {

        try {
            const registers = await Cliente.findAll()

            return res.json(registers)
        } catch (error) {
            console.log(error)
        }

    }

}