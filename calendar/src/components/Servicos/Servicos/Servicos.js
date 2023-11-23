import './Servicos.css';
import { useEffect, useState } from 'react';
import api from '../../../services/api'
import moment from 'moment';

import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';
import ServicoCard from '../ServicoCard/ServicoCard'
import ServicoModal from '../ServicoModal/ServicoModal'

function Servicos({servicos, createServico, updateServico, deleteServico}) {

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
        <div className="servico-column-header">
          Nome
        </div>
        <div className="servico-column-header">
          Preço
        </div>
        <div className="servico-column-header">
          Comissão
        </div>
      </div>
      <div className='servico-adicionar' onClick={() => setModalOpen(true)}>
        Adicionar serviço
      </div>
      <div className="servico-container">
        {servicos.map(data => (
          <ServicoCard 
            key={data.servico_id}
            data={data}
            onClick={() => clickCard(data)}
          />
        ))}
      </div>

      <ServicoModal 
        data={selectedCard} 
        isOpen={modalOpen} 
        openModal={() => setModalOpen(!modalOpen)}
        createServico={createServico}
        updateServico={updateServico}
        deleteServico={deleteServico}
        clearCard={() => setSelectedCard([])}
      />
    </>
  );
}

export default Servicos;