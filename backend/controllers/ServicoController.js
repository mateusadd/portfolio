const Servico = require('../models/Servico')

module.exports = {

    async create(req, res) {

        const servico = {
            servico_nome: req.body.servico_nome,
            servico_preco: req.body.servico_preco,
            servico_comissao: req.body.servico_comissao
        }

        const registers = await Servico.create(servico)
        return res.json(registers)

    },

    async read(req, res) {

        try {
            const registers = await Servico.findAll()

            return res.json(registers)
        } catch (error) {
            console.log(error)
        }

    },

    async update(req, res) {

        const servico = await Servico.findOne({where: {servico_id: req.params.servico_id}})

        servico.servico_nome = req.body.servico_nome
        servico.servico_preco = req.body.servico_preco
        servico.servico_comissao = req.body.servico_comissao

        await servico.save()

        return res.json(servico)

    },

    async delete(req, res) {
        try {
            await Servico.destroy({where: {servico_id: req.params.servico_id}})

            return res.json({msg:`${req.params.servico_id} deleted successfully!`})
        } catch (error) {
            console.log(error)
        }
    }

}