import './Clientes.css';
import { useEffect, useState } from 'react';
import api from '../../../services/api'
import moment from 'moment';

import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';
import ClienteCard from '../ClienteCard/ClienteCard'
import ClienteModal from '../ClienteModal/ClienteModal'

function Clientes({clientes, createCliente, updateCliente, deleteCliente}) {

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState([])

  function clickCard(data) {

    setSelectedCard(data);
    setModalOpen(true)

  }

  return (
    <>
      <Header/>
      <Sidebar/>
      <div className='top-bar'>
        <div className="cliente-column-header">
          Nome
        </div>
        <div className="cliente-column-header">
          Contato
        </div>
        <div className="cliente-column-header">
          Funcionário
        </div>
      </div>
      <div className='cliente-adicionar' onClick={() => setModalOpen(true)}>
        Adicionar cliente
      </div>
      <div className="cliente-container">
        {clientes.map(data => (
          <ClienteCard 
            key={data.cliente_id}
            data={data}
            onClick={() => clickCard(data)}
          />
        ))}
      </div>

      <ClienteModal 
        data={selectedCard} 
        isOpen={modalOpen} 
        openModal={() => setModalOpen(!modalOpen)}
        createCliente={createCliente}
        updateCliente={updateCliente}
        deleteCliente={deleteCliente}
        clearCard={() => setSelectedCard([])}
      />
    </>
  );
}

export default Clientes;