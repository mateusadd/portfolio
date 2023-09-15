const Funcionario = require('../models/Funcionario')

module.exports = {

    async create(req, res) {

        const funcionario = {
            funcionario_nome: req.body.funcionario_nome,
            funcionario_contato: req.body.funcionario_contato
        }

        await Funcionario.create(funcionario)
        return res.json({msg : `criado com sucesso`})

    },

    async read(req, res) {

        try {
            const registers = await Funcionario.findAll()

            return res.json(registers)
        } catch (error) {
            console.log(error)
        }

    }

}