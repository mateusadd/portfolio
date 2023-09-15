const express = require('express')
const routes = express.Router()

const ClienteController = require('./controllers/ClienteController')
const FuncionarioController = require('./controllers/FuncionarioController')
const ServicoController = require('./controllers/ServicoController')
const AgendamentoController = require('./controllers/AgendamentoController')
const PagamentoController = require('./controllers/PagamentoController')

routes.post('/cliente', ClienteController.create)
routes.get('/cliente', ClienteController.read)

routes.post('/funcionario', FuncionarioController.create)
routes.get('/funcionario', FuncionarioController.read)

routes.post('/servico', ServicoController.create)
routes.get('/servico', ServicoController.read)

routes.post('/agendamento', AgendamentoController.create)
routes.get('/agendamento', AgendamentoController.read)
routes.post('/agendamento/:agendamento_id', AgendamentoController.update)
routes.delete('/agendamento/:agendamento_id', AgendamentoController.delete)

routes.post('/pagamento', PagamentoController.create)
routes.get('/pagamento', PagamentoController.read)
routes.post('/pagamento/:pagamento_id', PagamentoController.update)
routes.delete('/pagamento/:pagamento_id', PagamentoController.delete)

module.exports = routes