import React from 'react';
import {useState, useEffect} from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom'
import './App.css';

import api from './services/api'
import Agendamento from './components/Agendamento/Agendamento';
import Home from './components/Home/Home';
import Clientes from './components/Clientes/Clientes/Clientes';
import Main from './components/Relatórios/Comissoes/Main/Main';

function App() {

  const [clientes, setClientes] = useState([])
  const [servicos, setServicos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])

  async function getClientes() {
    let res = await api.get('/cliente')
    setClientes(res.data)
  }

  async function getServicos() {
    let res = await api.get('/servico')
    setServicos(res.data)
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
          element: <Clientes/>
        },
        {
          path: "/relatorios/comissoes",
          element: <Main
            funcionarios={funcionarios} 
          />
        }
      ])}/>
    </div>
  );
}

export default App;
