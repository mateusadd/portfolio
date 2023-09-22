import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom'
import './App.css';

import Agendamento from './components/Agendamento/Agendamento';
import Home from './components/Home/Home';
import Clientes from './components/Clientes/Clientes/Clientes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/agendamento",
    element: <Agendamento/>
  },
  {
    path: "/clientes",
    element: <Clientes/>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
