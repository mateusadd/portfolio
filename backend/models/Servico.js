const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const Servico = sequelize.define('servico', {
    servico_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    servico_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    servico_preco: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    servico_comissao: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps : false,
    defaultScope: {
        attributes: { exclude: ['id'] }, // Exclui o campo 'id' das consultas SELECT
    },
})

module.exports = Servico