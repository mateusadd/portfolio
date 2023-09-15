const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const Agendamento = require('./Agendamento')

const Pagamento = sequelize.define('pagamento', {
    pagamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    agendamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pagamento_valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dividido: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    pagamento_metodo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    valor_dividido: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps : false,
    defaultScope: {
        attributes: { exclude: ['id'] }, // Exclui o campo 'id' das consultas SELECT
    },
})

Pagamento.belongsTo(Agendamento, {as: 'agendamento', foreignKey: 'agendamento_id'})

module.exports = Pagamento