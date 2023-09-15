const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const Funcionario = sequelize.define('funcionario', {
    funcionario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    funcionario_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    funcionario_contato: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps : false,
    defaultScope: {
        attributes: { exclude: ['id'] }, // Exclui o campo 'id' das consultas SELECT
    },
})

module.exports = Funcionario