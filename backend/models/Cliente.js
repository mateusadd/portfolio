const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const Cliente = sequelize.define('cliente', {
    cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cliente_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cliente_contato: {
        type: DataTypes.STRING,
        allowNull: true
    },
    funcionario: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps : false,
    defaultScope: {
        attributes: { exclude: ['id'] }, // Exclui o campo 'id' das consultas SELECT
    },
})

module.exports = Cliente