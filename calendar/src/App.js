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
import Funcionarios from './components/Funcionarios/Funcionarios/Funcionarios';

function App() {

  const [clientes, setClientes] = useState([])
  const [servicos, setServicos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])

  //---------------------------/CLIENTE---------------------------
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
    await api.delete(`/cliente/${cliente_id}`)
    setClientes(clientes.filter(data => data.cliente_id !== cliente_id))
  }

  //--------------------------------------------------------------
  //---------------------------/SERVICO---------------------------

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
    await api.delete(`/servico/${servico_id}`)
    setServicos(servicos.filter(data => data.servico_id !== servico_id))
  }
  
  //------------------------------------------------------------------
  //---------------------------/FUNCIONARIO---------------------------

  async function getFuncionarios() {
    let res = await api.get('/funcionario')
    setFuncionarios(res.data)
  }

  async function createFuncionario(funcionario) {
    let res = await api.post(`/funcionario`, {
      funcionario_nome: funcionario.funcionario_nome,
      funcionario_contato: funcionario.funcionario_contato,
      funcionario_cor: funcionario.funcionario_cor
    })
    setFuncionarios([...funcionarios, res.data])
  }

  async function updateFuncionario(funcionario) {
    let res = await api.post(`/funcionario/${funcionario.funcionario_id}`, {
      funcionario_nome: funcionario.funcionario_nome,
      funcionario_contato: funcionario.funcionario_contato,
      funcionario_cor: funcionario.funcionario_cor
    })

    let indexToUpdate = funcionarios.findIndex((data) => data.funcionario_id === funcionario.funcionario_id)
    let updatedFuncionarios = [...funcionarios]
    updatedFuncionarios[indexToUpdate] = res.data
    setFuncionarios(updatedFuncionarios)
  }

  async function deleteFuncionario(funcionario_id) {
    await api.delete(`/funcionario/${funcionario_id}`)
    setFuncionarios(funcionarios.filter(data => data.funcionario_id !== funcionario_id))
  }

  //------------------------------------------------------------------

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
          path: "/funcionarios",
          element: <Funcionarios
            funcionarios={funcionarios}
            createFuncionario={createFuncionario}
            updateFuncionario={updateFuncionario}
            deleteFuncionario={deleteFuncionario}
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
