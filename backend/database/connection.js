const Sequelize = require('sequelize')
const database = require('./database')

const connection = new Sequelize(database)

module.exports = connection