const Funcionario = require('../models/Funcionario')

module.exports = {

    async create(req, res) {

        const funcionario = {
            funcionario_nome: req.body.funcionario_nome,
            funcionario_contato: req.body.funcionario_contato,
            funcionario_cor: req.body.funcionario_cor
        }

        const registers = await Funcionario.create(funcionario)
        return res.json(registers)

    },

    async read(req, res) {

        try {
            const registers = await Funcionario.findAll()

            return res.json(registers)
        } catch (error) {
            console.log(error)
        }

    },

    async update(req, res) {

        const funcionario = await Funcionario.findOne({where: {funcionario_id: req.params.funcionario_id}})

        funcionario.funcionario_nome = req.body.funcionario_nome
        funcionario.funcionario_contato = req.body.funcionario_contato
        funcionario.funcionario_cor= req.body.funcionario_cor

        await funcionario.save()

        return res.json(funcionario)

    },

    async delete(req, res) {
        try {
            await Funcionario.destroy({where: {funcionario_id: req.params.funcionario_id}})

            return res.json({msg:`${req.params.funcionario_id} deleted successfully!`})
        } catch (error) {
            console.log(error)
        }
    }

}