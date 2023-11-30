import './Funcionarios.css';
import { useEffect, useState } from 'react';

import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';
import FuncionarioCard from '../FuncionarioCard/FuncionarioCard'
import FuncionarioModal from '../FuncionarioModal/FuncionarioModal'

function Funcionarios({funcionarios, createFuncionario, updateFuncionario, deleteFuncionario}) {

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState([])

  function clickCard(data) {

    setSelectedCard(data);
    setModalOpen(true)

  }

  function handleAddFuncionario() {
    setModalOpen(true);
  }

  function handleKeyDown(event) {
    // Verifica se a tecla pressionada é a tecla Enter (código 13)
    if (event.keyCode === 13) {
      handleAddFuncionario();
    }
  }

  useEffect(() => {
    // Adiciona um ouvinte de teclado quando o componente é montado
    document.addEventListener("keydown", handleKeyDown);

    // Remove o ouvinte de teclado quando o componente é desmontado
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Header/>
      <Sidebar/>
      <div className='top-bar'>
        <div className="funcionario-column-header">
          Nome
        </div>
        <div className="funcionario-column-header">
          Contato
        </div>
        <div className="funcionario-column-header">
          Cor
        </div>
      </div>
      <div className='funcionario-adicionar' onClick={handleAddFuncionario} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
        Adicionar funcionário
      </div>
      <div className="funcionario-container">
        {funcionarios.map(data => (
          <FuncionarioCard 
            key={data.funcionario_id}
            data={data}
            onClick={() => clickCard(data)}
          />
        ))}
      </div>

      <FuncionarioModal 
        data={selectedCard} 
        isOpen={modalOpen} 
        openModal={() => setModalOpen(!modalOpen)}
        createFuncionario={createFuncionario}
        updateFuncionario={updateFuncionario}
        deleteFuncionario={deleteFuncionario}
        clearCard={() => setSelectedCard([])}
      />
    </>
  );
}

export default Funcionarios;