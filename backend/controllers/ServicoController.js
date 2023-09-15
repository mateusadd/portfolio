const Servico = require('../models/Servico')

module.exports = {

    async create(req, res) {

        const servico = {
            servico_nome: req.body.servico_nome,
            servico_preco: req.body.servico_preco,
            servico_comissao: req.body.servico_comissao
        }

        await Servico.create(servico)
        return res.json({msg : `criado com sucesso`})

    },

    async read(req, res) {

        try {
            const registers = await Servico.findAll()

            return res.json(registers)
        } catch (error) {
            console.log(error)
        }

    }

}