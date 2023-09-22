import React, {useState, useEffect} from 'react';
import "./Modal.css";
import api from '../../services/api'
import { dateFormat } from '../../utils/dateFormat';

const Modal = ({ isOpen, openModal, onSave, onUpdate, onDelete, selected, clientes, servicos, funcionarios, clearSelected, selectedDateTime, clearSelectedDateTime }) => {

    const [cliente, setCliente] = useState('')
    const [servico, setServico] = useState('')
    const [funcionario, setFuncionario] = useState('')
    const [agendamento_datetime_start, setStart] = useState('')
    const [agendamento_datetime_end, setEnd] = useState('') 
    const [fkCliente, setfkCliente] = useState({})
    const [fkServico, setfkServico] = useState({})
    const [fkFuncionario, setfkFuncionario] = useState({})

    async function createDataInBackend() {

        return await api.post(`/agendamento`, {
            cliente_id: cliente,
            servico_id: servico,
            funcionario_id: funcionario,
            agendamento_datetime_start: agendamento_datetime_start,
            agendamento_datetime_end: agendamento_datetime_end
        })

    }

    async function updateDataInBackend() {

        return await api.post(`/agendamento/${selected.agendamento_id}`, {
            cliente_id: cliente,
            servico_id: servico,
            funcionario_id: funcionario,
            agendamento_datetime_start: agendamento_datetime_start,
            agendamento_datetime_end: agendamento_datetime_end
        })

    }

    async function deleteDataFromBackend() {

        if(window.confirm(`Quer mesmo excluir a solicitação #${selected.agendamento_id}?`)){
            return await api.delete(`/agendamento/${selected.agendamento_id}`)
        }

    }

    async function handleSave() {

        if(Array.isArray(selected)) {
            let res = await createDataInBackend()
            onSave(res.data, fkCliente, fkServico, fkFuncionario)
        } else {
            let res = await updateDataInBackend()
            onUpdate(res.data, fkCliente, fkServico, fkFuncionario)
            openModal()
            clearSelected()
        }

    }

    async function handleDelete() {

        let res = await deleteDataFromBackend()
        if(res){
            onDelete()
            openModal()
            clearSelected()
        }

    }

    function handleClose() {
        openModal()
        clearSelected()
        clearSelectedDateTime()
    }

    function handleCliente(e) {
        setCliente(e.value)
        let select = clientes.find(cliente => cliente.cliente_id == e.value)
        setfkCliente(select)
    }

    function handleServico(e) {
        setServico(e.value)
        let select = servicos.find(servico => servico.servico_id == e.value)
        setfkServico(select)
    }

    function handleFuncionario(e) {
        setFuncionario(e.value)
        let select = funcionarios.find(funcionario => funcionario.funcionario_id == e.value)
        setfkFuncionario(select)
    }

    function handleHorario(value) {

        setStart(value)
        let inputDate = new Date(value)
        // Adicione meia hora em milissegundos (30 minutos = 30 * 60 * 1000)
        var novaDataEmMilissegundos = inputDate.getTime() + (30 * 60 * 1000);

        // Crie um novo objeto Date com a nova data em milissegundos
        var novaData = new Date(novaDataEmMilissegundos);

        // Formate a nova data para exibição (por exemplo, no formato ISO)
        var novaDataFormatada = novaData.toISOString();
            
        setEnd(novaDataFormatada)
       
    }

    useEffect(() => {

        if(isOpen){
            setCliente(selected.cliente ? selected.cliente.cliente_id : '')
            setServico(selected.servico ? selected.servico.servico_id : '')
            setFuncionario(selected.funcionario ? selected.funcionario.funcionario_id : '')

            if (selected.start) {
                setStart(dateFormat(selected.start).toISOString().slice(0, 16));
                setEnd(dateFormat(selected.end).toISOString().slice(0, 16));
            } else {
                handleHorario(selectedDateTime)
            }
        }
        
    }, [isOpen])


  if(isOpen) {
    return (
        <div className='background'>
            <div className='modal'>
                <div className='modal-header'>
                    <p>ADICIONAR</p>
                </div>

                <div className='modal-details-tecnico'>
                    <p>Cliente: </p>
                    <select id='cliente' name='cliente' value={cliente} onChange={e => handleCliente(e.target)}>
                        <option value=""></option>
                        {clientes.map(cliente => (
                            <option key={cliente.cliente_id} value={cliente.cliente_id}>{cliente.cliente_nome}</option>
                        ))}
                    </select>
                </div>
                <div className='modal-details-tecnico'>
                    <p>Serviço: </p>
                    <select id='servico' name='servico' value={servico} onChange={e => handleServico(e.target)}>
                        <option value=""></option>
                        {servicos.map(servico => (
                            <option key={servico.servico_id} value={servico.servico_id}>{servico.servico_nome}</option>
                        ))}
                    </select>
                </div>
                <div className='modal-details-tecnico'>
                    <p>Funcionário: </p>
                    <select id='funcionario' name='funcionario' value={funcionario} onChange={e => handleFuncionario(e.target)}>
                        <option value=""></option>
                        {funcionarios.map(funcionario => (
                            <option key={funcionario.funcionario_id} value={funcionario.funcionario_id}>{funcionario.funcionario_nome}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <p>Start: </p>
                    <input type='datetime-local' id='start' name='start' value={agendamento_datetime_start} onChange={e => handleHorario(e.target.value)}/>
                </div>

                <div className='modal-footer'>
                    <button onClick={handleSave} className='modal-salvar'>SALVAR</button>
                    <button onClick={handleClose} className='modal-fechar'>FECHAR</button>
                    {selected.agendamento_id && (
                        <button onClick={handleDelete} className='modal-delete'>DELETAR</button>
                    )}
                </div>
            </div>
        </div>
    );
  } else {
    return null
  }

};

export default Modal;