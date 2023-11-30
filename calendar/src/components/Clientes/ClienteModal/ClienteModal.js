import './ClienteModal.css';
import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';

function ClienteModal({data, isOpen, openModal, createCliente, updateCliente, deleteCliente, clearCard}) {

    const [clienteNome, setClienteNome] = useState('')
    const [clienteContato, setClienteContato] = useState('')
    const [clienteFuncionario, setClienteFuncionario] = useState('')

    async function handleSaveCliente() {

        if (!clienteNome || clienteNome.trim() === '') {
            window.alert("Por favor, preencha todos os campos.")
            return;
        } else if (!isNaN(clienteNome)) {
            window.alert("Há valores inconsistentes. Por favor, revise as informações.")
            return;
        }

        const cliente = {
            cliente_id: data.cliente_id,
            cliente_nome: clienteNome,
            cliente_contato: clienteContato,
            funcionario: clienteFuncionario,
        }

        if(Array.isArray(data)) {
            await createCliente(cliente)
        } else {
            await updateCliente(cliente)
        }

        handleCloseModalCliente()
    }

    async function handleDeleteCliente() {
        if(window.confirm(`Quer mesmo excluir este registro?`)){
            await deleteCliente(data.cliente_id)
            handleCloseModalCliente()
        }
    }

    function handleCloseModalCliente() {
        openModal()
        clearCard()
    }

    useEffect(() => {
        if(data) {
            setClienteNome(data.cliente_nome)
            setClienteContato(data.cliente_contato)
            setClienteFuncionario(data.funcionario)
        }
    }, [data])

    useEffect(() => {
        setClienteFuncionario(false)
    }, [])

  if(isOpen) {
    return (
        <>
          <div className='cliente-background'>
            <div className='cliente-modal'>
                <div className='cliente-modal-header'>
                    <p>{data && Array.isArray(data) ? 'ADICIONAR CLIENTE' : `EDITAR CLIENTE: #${data.cliente_id}`}</p>
                </div>
                <div className='cliente-modal-text'>
                    <p>Nome: </p>
                    <input type='text' id='cliente-nome' name='cliente-nome' defaultValue={clienteNome} onChange={(event) => setClienteNome(event.target.value)} />
                </div>
                <div className='cliente-modal-text'>
                    <p>Contato: </p>
                    <input type='text' id='cliente-contato' name='cliente-contato' defaultValue={clienteContato} onChange={(event) => setClienteContato(event.target.value)} />
                </div>
                <div className='cliente-modal-funcionario'>
                    <p>Funcionário: </p>
                    <Switch checked={clienteFuncionario} onChange={(event) => setClienteFuncionario(event.target.checked)}/>
                </div>
                <div className='cliente-modal-footer'>
                    <button onClick={handleSaveCliente} className='cliente-modal-salvar'>SALVAR</button>
                    <button onClick={handleCloseModalCliente} className='cliente-modal-fechar'>FECHAR</button>
                    <button onClick={handleDeleteCliente} className='cliente-modal-delete'>DELETAR</button>
                </div>
            </div>
          </div>
        </>
      );
  }
}

export default ClienteModal;