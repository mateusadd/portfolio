import React, {useState, useEffect} from 'react';
import "./Modal.css";
import api from '../../services/api'
import { dateFormat } from '../../utils/dateFormat';
import { verifyTotalPayment } from '../../utils/verifyTotalPayment'
import { verifyMethods } from '../../utils/verifyMethods'
import Pagamentos from '../Pagamentos/Pagamentos';

function Modal({ isOpen, openModal, onSave, onUpdate, onDeleteAgendamento, selected, clientes, servicos, funcionarios, payMethods, setPayMethods, clearSelected, selectedDateTime }) {
    
    const [cliente, setCliente] = useState('')
    const [servico, setServico] = useState('')
    const [funcionario, setFuncionario] = useState('')
    const [agendamento_datetime_start, setAgendamento_datetime_start] = useState('')
    const [agendamento_datetime_end, setAgendamento_datetime_end] = useState('') 
    const [fkCliente, setFkCliente] = useState({})
    const [fkServico, setFkServico] = useState({})
    const [fkFuncionario, setFkFuncionario] = useState({})
    const [valor, setValor] = useState('');
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [listOfPayments, setListOfPayments] = useState([])
    const [pagamentos, setPagamentos] = useState([]);
    const [idsToDelete, setIdsToDelete] = useState([])
    const [verificaCliente, setVerificaCliente] = useState(false)
    const [controlaValorServico, setControlaValorServico] = useState(null)

    //------------------------COMUNICAÇÃO COM API------------------------

    async function getCorrespondingPayments() {
        let res = await api.get(`/pagamento?agendamento_id=${selected.agendamento_id}`)
        return res.data
    }

    async function createDataInBackend() {

        return await api.post(`/agendamento`, {
            cliente_id: cliente,
            servico_id: servico,
            funcionario_id: funcionario,
            agendamento_datetime_start: agendamento_datetime_start,
            agendamento_datetime_end: agendamento_datetime_end
        })

    }

    async function createPayment(item, id) {
        let res = await api.post(`/pagamento`, {
            agendamento_id: id,
            dividido: 0,
            valor_dividido: null,
            pagamento_metodo: item.metodoPagamento,
            pagamento_valor: item.valor
        })

        return res.data
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

        let res = await getCorrespondingPayments()

        if(res.length > 0) {
            if(window.confirm(`Deletar este agendamento apagará os registros de pagamento correspondentes. Deseja mesmo continuar?`)){
                for(let item of res) {
                    await deletePagamento(item.pagamento_id)
                }
                return await api.delete(`/agendamento/${selected.agendamento_id}`)
            }
        } else {
            if(window.confirm(`Quer mesmo excluir este agendamento?`)){
                return await api.delete(`/agendamento/${selected.agendamento_id}`)
            }
        }

    }

    async function deletePagamento(pagamento_id) {
        let res = await api.delete(`/pagamento/${pagamento_id}`)
        return res.data
    }

    async function handleCreatePayment(item, id) {
        let res = await createPayment(item, id);
        setPayMethods(prevList => [...prevList, res]);
        return res;
    }

    //-------------------------------------------------------------------
    //---------------------------HANDLE EVENTS---------------------------

    function handleCliente(value) {
        setCliente(value)
        let select = clientes.find(cliente => cliente.cliente_id == value)
        if(select) { select.funcionario === false ? setVerificaCliente(false) : setVerificaCliente(true) }
        setFkCliente(select)
    }

    function handleServico(value) {
        setServico(value)
        let select = servicos.find(servico => servico.servico_id == value)
        if(select) { verificaCliente === false ? setValor(select.servico_preco) : setValor((select.servico_preco) * 0.6) }
        setFkServico(select)
    }

    function handleFuncionario(value) {
        setFuncionario(value)
        let select = funcionarios.find(funcionario => funcionario.funcionario_id == value)
        setFkFuncionario(select)
    }

    function handleHorario(value) {

        setAgendamento_datetime_start(value)
        
        let inputDate = new Date(value)
        let novaDataEmMilissegundos = inputDate.getTime() + (30 * 60 * 1000);

        let novaData = new Date(novaDataEmMilissegundos);

        let novaDataFormatada = novaData.toISOString();
                    
        setAgendamento_datetime_end(novaDataFormatada)
    }

    async function handleSaveAgendamento() {

        console.log(pagamentos)

        if (!cliente || cliente === '' || !servico || servico === '' ||!funcionario || funcionario === '') {

            window.alert("Por favor, preencha todos os campos.")
            
        } else if(pagamentos.length > 0 && controlaValorServico !== verifyTotalPayment(pagamentos)) {

            if(window.confirm('Valor informado é diferente do valor do serviço. Deseja salvar mesmo assim?')){
                return saveInformation()
            }            

        } else if (verifyMethods(pagamentos)){
            
            window.alert('Há métodos de pagamento idênticos. Por favor, revise as informações.')

        } else {
            saveInformation()
        }

    }

    async function handleDeleteAgendamento() {

        let res = await deleteDataFromBackend()
        if(res){
            onDeleteAgendamento()
            handleCloseModal()
        }

    }
      
    async function handleDeletePagamento(id) {
        let res = await api.get(`/pagamento?pagamento_id=${id}`)
        if(res.data) {
            await deletePagamento(id);
            setPayMethods(prevList => prevList.filter(payment => payment.pagamento_id !== id));
        }
    }

    function handleCloseModal() {
        clearAll()
        openModal()
    }

    //-------------------------------------------------------------------

    async function saveInformation() {
        if(Array.isArray(selected)) {
            let res = await createDataInBackend()
            for(let [index] of pagamentos.entries()) {
                handleCreatePayment(pagamentos[index], res.data.agendamento_id)
            }
            onSave(res.data, fkCliente, fkServico, fkFuncionario)
            handleCloseModal()
        } else {
            let res = await updateDataInBackend()
            onUpdate(res.data, fkCliente, fkServico, fkFuncionario)
            for(let [index] of pagamentos.entries()) {
                let control = false
                for(let [j] of listOfPayments.entries()) {
                    if(pagamentos[index].id === listOfPayments[j].pagamento_id) {
                        control = true
                    }
                }
                if(control !== true) {
                    handleCreatePayment(pagamentos[index], res.data.agendamento_id)
                }
            }
            for(let [index] of idsToDelete.entries()) {
                handleDeletePagamento(idsToDelete[index])
            }
            handleCloseModal()
        }
    }

    function clearAll(){
        clearSelected()
        setAgendamento_datetime_start('')
        setAgendamento_datetime_end('')
        setValor('')
        setMetodoPagamento('')
        setVerificaCliente(false)
        setControlaValorServico(null)
        setPagamentos([])
        setListOfPayments([])
        setIdsToDelete([])
    }

    useEffect(() => {

        if(selected){

            setListOfPayments(payMethods.filter(item => item.agendamento_id === selected.agendamento_id))

            handleCliente(selected.cliente_id)
            handleServico(selected.servico_id)
            handleFuncionario(selected.funcionario_id)

            if (selected.start) {
                setAgendamento_datetime_start(dateFormat(selected.start).toISOString().slice(0, 16));
                setAgendamento_datetime_end(dateFormat(selected.end).toISOString().slice(0, 16));
            } 
            
        } 
    
    }, [selected])

    useEffect(() => {
        handleHorario(selectedDateTime)
    }, [selectedDateTime]);

    useEffect(() => {
        setControlaValorServico(valor)
    }, [servico])

  if(isOpen) {
    return (
        <div className='background'>
            <div className='modal'>
                <div className='modal-header'>
                </div>
                <div className='modal-body'>
                    <div className='modal-left'>
                        <div className='modal-input'>
                            <p className='modal-label'>Cliente: </p>
                            <select className='modal-select' id='cliente' name='cliente' value={cliente} onChange={e => handleCliente(e.target.value)}>
                                <option value=""></option>
                                {clientes.map(cliente => (
                                    <option key={cliente.cliente_id} value={cliente.cliente_id}>{cliente.cliente_nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className='modal-input'>
                            <p className='modal-label'>Serviço: </p>
                            <select className='modal-select' id='servico' name='servico' value={servico} onChange={e => handleServico(e.target.value)}>
                                <option value=""></option>
                                {servicos.map(servico => (
                                    <option key={servico.servico_id} value={servico.servico_id}>{servico.servico_nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className='modal-input'>
                            <p className='modal-label'>Funcionário: </p>
                            <select className='modal-select' id='funcionario' name='funcionario' value={funcionario} onChange={e => handleFuncionario(e.target.value)}>
                                <option value=""></option>
                                {funcionarios.map(funcionario => (
                                    <option key={funcionario.funcionario_id} value={funcionario.funcionario_id}>{funcionario.funcionario_nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className='modal-input'>
                            <p className='modal-label'>Data/Hora: </p>
                            <input className='modal-select' type='datetime-local' id='start' name='start' defaultValue={agendamento_datetime_start} onChange={e => handleHorario(e.target.value)}/>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={handleSaveAgendamento} className='modal-salvar'>SALVAR</button>
                            <button onClick={handleCloseModal} className='modal-fechar'>FECHAR</button>
                            {selected.agendamento_id && (
                                <button onClick={handleDeleteAgendamento} className='modal-delete'>DELETAR</button>
                            )}
                        </div>
                    </div>
                    <div className='modal-right'>
                        <Pagamentos 
                            pagamentos={pagamentos}
                            setPagamentos={setPagamentos}
                            valor={valor}
                            setValor={setValor}
                            metodoPagamento={metodoPagamento}
                            setMetodoPagamento={setMetodoPagamento}
                            listOfPayments={listOfPayments}
                            setIdsToDelete={setIdsToDelete}
                        />
                    </div>
                </div>

                
            </div>
        </div>
    );
  } else {
    return null
  }

};

export default Modal;