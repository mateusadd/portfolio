import {React, useState, useEffect} from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './App.css';

import api from './services/api'
import Agendamento from './components/Agendamento/Agendamento';
import Home from './components/Home/Home';
import Clientes from './components/Clientes/Clientes/Clientes';
import Servicos from './components/Servicos/Servicos/Servicos';
import MainComissoes from './components/Relatórios/Comissoes/Main/MainComissoes';
import MainPagamentos from './components/Relatórios/Pagamentos/Main/MainPagamentos';

function App() {

  const [clientes, setClientes] = useState([])
  const [servicos, setServicos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])

  async function getClientes() {
    let res = await api.get('/cliente')
    setClientes(res.data)
  }

  async function createCliente(cliente) {
    let res = await api.post(`/cliente`, {
      cliente_nome: cliente.cliente_nome,
      cliente_contato: cliente.cliente_contato,
      funcionario: cliente.funcionario
    })
    setClientes([...clientes, res.data])
  }

  async function updateCliente(cliente) {
    let res = await api.post(`/cliente/${cliente.cliente_id}`, {
      cliente_nome: cliente.cliente_nome,
      cliente_contato: cliente.cliente_contato,
      funcionario: cliente.funcionario
    })

    let indexToUpdate = clientes.findIndex((data) => data.cliente_id === cliente.cliente_id)
    let updatedClientes = [...clientes]
    updatedClientes[indexToUpdate] = res.data
    setClientes(updatedClientes)
  }

  async function deleteCliente(cliente_id) {
    let res = await api.delete(`/cliente/${cliente_id}`)
    setClientes(clientes.filter(data => data.cliente_id !== cliente_id))
  }


  async function getServicos() {
    let res = await api.get('/servico')
    setServicos(res.data)
  }

  async function createServico(servico) {
    let res = await api.post(`/servico`, {
      servico_nome: servico.servico_nome,
      servico_preco: servico.servico_preco,
      servico_comissao: servico.servico_comissao
    })
    setServicos([...servicos, res.data])
  }

  async function updateServico(servico) {
    let res = await api.post(`/servico/${servico.servico_id}`, {
      servico_nome: servico.servico_nome,
      servico_preco: servico.servico_preco,
      servico_comissao: servico.servico_comissao
    })

    let indexToUpdate = servicos.findIndex((data) => data.servico_id === servico.servico_id)
    let updatedServicos = [...servicos]
    updatedServicos[indexToUpdate] = res.data
    setServicos(updatedServicos)
  }

  async function deleteServico(servico_id) {
    let res = await api.delete(`/servico/${servico_id}`)
    setServicos(servicos.filter(data => data.servico_id !== servico_id))
  }

  async function getFuncionarios() {
    let res = await api.get('/funcionario')
    setFuncionarios(res.data)
  }

  useEffect(() => {
    getClientes()
    getServicos()
    getFuncionarios()
  }, [])

  return (
    <div className="App">
      <RouterProvider router={createBrowserRouter([
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/agendamento",
          element: <Agendamento
            clientes={clientes}
            servicos={servicos}
            funcionarios={funcionarios}
          />
        },
        {
          path: "/clientes",
          element: <Clientes
            clientes={clientes}
            createCliente={createCliente}
            updateCliente={updateCliente}
            deleteCliente={deleteCliente}
          />
        },
        {
          path: "/servicos",
          element: <Servicos
            servicos={servicos}
            createServico={createServico}
            updateServico={updateServico}
            deleteServico={deleteServico}
          />
        },
        {
          path: "/relatorios/comissoes",
          element: <MainComissoes
            funcionarios={funcionarios} 
          />
        },
        {
          path: "/relatorios/pagamentos",
          element: <MainPagamentos/>
        }
      ])}/>
    </div>
  );
}

export default App;
