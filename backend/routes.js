const express = require('express')
const routes = express.Router()

const ClienteController = require('./controllers/ClienteController')
const FuncionarioController = require('./controllers/FuncionarioController')
const ServicoController = require('./controllers/ServicoController')
const AgendamentoController = require('./controllers/AgendamentoController')
const PagamentoController = require('./controllers/PagamentoController')
const ComissoesController = require('./controllers/ComissoesController')
const RelatorioPagamentoController = require('./controllers/RelatorioPagamentoController')

routes.post('/cliente', ClienteController.create)
routes.get('/cliente', ClienteController.read)
routes.post('/cliente/:cliente_id', ClienteController.update)
routes.delete('/cliente/:cliente_id', ClienteController.delete)

routes.post('/funcionario', FuncionarioController.create)
routes.get('/funcionario', FuncionarioController.read)
routes.post('/funcionario/:funcionario_id', FuncionarioController.update)
routes.delete('/funcionario/:funcionario_id', FuncionarioController.delete)

routes.post('/servico', ServicoController.create)
routes.get('/servico', ServicoController.read)
routes.post('/servico/:servico_id', ServicoController.update)
routes.delete('/servico/:servico_id', ServicoController.delete)

routes.post('/agendamento', AgendamentoController.create)
routes.get('/agendamento', AgendamentoController.read)
routes.post('/agendamento/:agendamento_id', AgendamentoController.update)
routes.delete('/agendamento/:agendamento_id', AgendamentoController.delete)

routes.post('/pagamento', PagamentoController.create)
routes.get('/pagamento', PagamentoController.read)
routes.post('/pagamento/:pagamento_id', PagamentoController.update)
routes.delete('/pagamento/:pagamento_id', PagamentoController.delete)

routes.get('/comissoes', ComissoesController.read)
routes.get('/pagamentos', RelatorioPagamentoController.read)

module.exports = routes