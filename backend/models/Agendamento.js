const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const Cliente = require('./Cliente')
const Servico = require('./Servico')
const Funcionario = require('./Funcionario')

const Agendamento = sequelize.define('agendamento', {
    agendamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    servico_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    agendamento_data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    agendamento_hora: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pago: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps : false,
    defaultScope: {
        attributes: { exclude: ['id'] }, // Exclui o campo 'id' das consultas SELECT
    },
})

Agendamento.belongsTo(Cliente, {as: 'cliente', foreignKey: 'cliente_id'})
Agendamento.belongsTo(Servico, {as: 'servico', foreignKey: 'servico_id'})
Agendamento.belongsTo(Funcionario, {as: 'funcionario', foreignKey: 'funcionario_id'})

module.exports = Agendamento