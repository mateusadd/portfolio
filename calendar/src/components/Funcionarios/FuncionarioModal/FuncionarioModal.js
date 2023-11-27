import './FuncionarioModal.css';
import React, { useEffect, useState } from 'react';

import { CirclePicker } from 'react-color'

import api from '../../../services/api'
import moment from 'moment';

import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';

function FuncionarioModal({data, isOpen, openModal, createFuncionario, updateFuncionario, deleteFuncionario, clearCard}) {

    console.log(data)

    const [funcionarioNome, setFuncionarioNome] = useState('')
    const [funcionarioContato, setFuncionarioContato] = useState('')
    const [funcionarioCor, setFuncionarioCor] = useState('#fff')

    async function handleSave() {

        if (!funcionarioNome || funcionarioNome.trim() === '') {
            window.alert("Por favor, preencha todos os campos.")
            return;
        }

        const funcionario = {
            funcionario_id: data.funcionario_id,
            funcionario_nome: funcionarioNome,
            funcionario_contato: funcionarioContato,
            funcionario_cor: funcionarioCor
        }

        console.log(funcionarioCor)

        if(Array.isArray(data)) {
            await createFuncionario(funcionario)
        } else {
            await updateFuncionario(funcionario)
        }

        openModal()
        clearCard()
    }

    function handleClose() {
        openModal()
        clearCard()
    }

    async function handleDelete() {
        if(window.confirm(`Quer mesmo excluir este registro?`)){
            await deleteFuncionario(data.funcionario_id)
            openModal()
            clearCard()
        } else {}
    }

    useEffect(() => {
        if(data) {
            setFuncionarioNome(data.funcionario_nome)
            setFuncionarioContato(data.funcionario_contato)
            setFuncionarioCor(data.funcionario_cor)
        }
    }, [data])

  if(isOpen) {
    return (
        <>
          <div className='funcionario-background'>
            <div className='funcionario-modal'>
                <div className='funcionario-modal-header'>
                    <p>{data && Array.isArray(data) ? 'ADICIONAR FUNCIONÁRIO' : `EDITAR FUNCIONÁRIO: #${data.funcionario_id}`}</p>
                </div>
                <div className='funcionario-modal-text'>
                    <p>Nome: </p>
                    <input type='text' id='funcionario-nome' name='funcionario-nome' defaultValue={funcionarioNome} onChange={(event) => setFuncionarioNome(event.target.value)} />
                </div>
                <div className='funcionario-modal-text'>
                    <p>Contato: </p>
                    <input type='text' id='funcionario-contato' name='funcionario-contato' defaultValue={funcionarioContato} onChange={(event) => setFuncionarioContato(event.target.value)} />
                </div>
                <div className='funcionario-modal-cor'>
                    <p>Cor: </p>
                    <CirclePicker color={funcionarioCor} onChangeComplete={(color) => setFuncionarioCor(color.hex)} />
                </div>
                <div className='funcionario-modal-footer'>
                    <button onClick={handleSave} className='funcionario-modal-salvar'>SALVAR</button>
                    <button onClick={handleClose} className='funcionario-modal-fechar'>FECHAR</button>
                    <button onClick={handleDelete} className='funcionario-modal-delete'>DELETAR</button>
                </div>
            </div>
          </div>
        </>
      );
  }
}

export default FuncionarioModal;