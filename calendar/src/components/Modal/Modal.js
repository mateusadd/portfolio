import React, {useState, useEffect} from 'react';
import "./Modal.css";
import api from '../../services/api'
import { dateFormat } from '../../utils/dateFormat';
import Payment from '../Payment/Payment';

const Modal = ({ isOpen, openModal, onSave, onUpdate, handlePayments, onDeleteAgendamento, selected, clientes, servicos, funcionarios, payMethods, setPayMethods, clearSelected, selectedDateTime, clearSelectedDateTime }) => {
    
    //const [payList, setPayList] = useState([])
    const [payment, setPayment] = useState([])
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
    const [carrinho, setCarrinho] = useState([]);
    const [idsToDelete, setIdsToDelete] = useState([])
    const [verificaCliente, setVerificaCliente] = useState(false)
    const [controlaValorServico, setControlaValorServico] = useState('')

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

    async function handleCreatePayment(item, id) {
        let res = await createPayment(item, id);
        setPayMethods(prevList => [...prevList, res]);
        return res;
      }
      
    async function handleDeletePayment(id) {
        let res = await api.get(`/pagamento?pagamento_id=${id}`)
        if(res.data) {
            await deletePayment(id);
            setPayMethods(prevList => prevList.filter(payment => payment.pagamento_id !== id));
        }
    }

    async function getCorrespondingPayments() {
        let res = await api.get(`/pagamento?agendamento_id=${selected.agendamento_id}`)
        return res.data
    }

    async function deleteDataFromBackend() {

        let res = await getCorrespondingPayments()

        if(res.length > 0) {
            if(window.confirm(`Deletar este agendamento apagará os registros de pagamento correspondentes. Deseja mesmo continuar?`)){
                for(let item of res) {
                    await deletePayment(item.pagamento_id)
                }
                return await api.delete(`/agendamento/${selected.agendamento_id}`)
            } else {}
        } else {
            if(window.confirm(`Quer mesmo excluir este agendamento?`)){
                return await api.delete(`/agendamento/${selected.agendamento_id}`)
            } else {}
        }

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

    async function deletePayment(pagamento_id) {
        let res = await api.delete(`/pagamento/${pagamento_id}`)
        return res.data
    }

    function verifyTotalPayment() {
        let valoresSoma = 0

        for(let [index] of carrinho.entries()) {
            valoresSoma += carrinho[index].valor
        }

        return valoresSoma
    }

    function verifyMethods() {
        let metodo = ''
        let status = false

        for(let [index] of carrinho.entries()) {
            if(carrinho[index].metodoPagamento === metodo) {
                status = true
            }
            metodo = carrinho[index].metodoPagamento
        }

        return status
    }

    async function saveInformation() {
        if(Array.isArray(selected)) {
            let res = await createDataInBackend()
            for(let [index] of carrinho.entries()) {
                handleCreatePayment(carrinho[index], res.data.agendamento_id)
            }
            onSave(res.data, fkCliente, fkServico, fkFuncionario)
            clearAll()
            openModal()
        } else {
            let res = await updateDataInBackend()
            onUpdate(res.data, fkCliente, fkServico, fkFuncionario)
            for(let [index] of carrinho.entries()) {
                let control = false
                for(let [j] of listOfPayments.entries()) {
                    if(carrinho[index].id === listOfPayments[j].pagamento_id) {
                        control = true
                    }
                }
                if(control !== true) {
                    handleCreatePayment(carrinho[index], res.data.agendamento_id)
                }
            }
            for(let [index] of idsToDelete.entries()) {
                handleDeletePayment(idsToDelete[index])
            }
            clearAll()
            openModal()
        }
    }

    async function handleSave() {
        
        if(carrinho.length > 0 && controlaValorServico !== verifyTotalPayment()) {

            if(window.confirm('Valor informado é diferente do valor do serviço. Deseja salvar mesmo assim?')){
                return saveInformation()
            }            

        } else if (verifyMethods()){
            
            window.alert('Há métodos de pagamento idênticos. Por favor, revise as informações.')

        } else {
            saveInformation()
        }

    }

    async function handleDeleteAgendamento() {

        let res = await deleteDataFromBackend()
        if(res){
            onDeleteAgendamento()
            clearAll()
            openModal()
        }

    }

    function handleClose() {
        //console.log(valoresPagamento)
        //console.log(metodosPagamento)
        //console.log(idsPagamento)
        clearAll()
        openModal()
    }

    function clearAll(){
        clearSelected()
        //clearSelectedDateTime()
        setListOfPayments([])
        setAgendamento_datetime_start('')
        setAgendamento_datetime_end('')
        setPayment([])
        setCarrinho([])
        setIdsToDelete([])
        //setPayList([])
        setValor('')
        setMetodoPagamento('')
    }

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
        // Adicione meia hora em milissegundos (30 minutos = 30 * 60 * 1000)
        let novaDataEmMilissegundos = inputDate.getTime() + (30 * 60 * 1000);

        // Crie um novo objeto Date com a nova data em milissegundos
        let novaData = new Date(novaDataEmMilissegundos);

        // Formate a nova data para exibição (por exemplo, no formato ISO)
        let novaDataFormatada = novaData.toISOString();
                    
        setAgendamento_datetime_end(novaDataFormatada)
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
                            <button onClick={handleSave} className='modal-salvar'>SALVAR</button>
                            <button onClick={handleClose} className='modal-fechar'>FECHAR</button>
                            {selected.agendamento_id && (
                                <button onClick={handleDeleteAgendamento} className='modal-delete'>DELETAR</button>
                            )}
                        </div>
                    </div>
                    <div className='modal-right'>
                        <Payment 
                            carrinho={carrinho}
                            setCarrinho={setCarrinho}
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