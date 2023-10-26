import React, {useState, useEffect} from 'react';
import "./Modal.css";
import api from '../../services/api'
import { dateFormat } from '../../utils/dateFormat';
import Payment from '../Payment/Payment';

const Modal = ({ isOpen, openModal, onSave, onUpdate, handlePayments, onDeleteAgendamento, selected, clientes, servicos, funcionarios, payMethods, clearSelected, selectedDateTime, clearSelectedDateTime }) => {

    const [valoresPagamento, setValoresPagamento] = useState([
        { valor: 0 },
        { valor: 0 },
        { valor: 0 }
    ])

    const [metodosPagamento, setMetodosPagamento] = useState([
        { metodo: '' },
        { metodo: '' },
        { metodo: '' }
    ])

    const [idsPagamento, setIdsPagamento] = useState([
        { id: null },
        { id: null },
        { id: null }
    ])
    
    //const [payList, setPayList] = useState([])
    const [indexToRemove, setIndexToRemove] = useState(null)
    const [indexController, setIndexController] = useState(0)
    const [payment, setPayment] = useState([])
    const [addButton, setAddButton] = useState(true)
    const [cliente, setCliente] = useState('')
    const [servico, setServico] = useState('')
    const [funcionario, setFuncionario] = useState('')
    const [agendamento_datetime_start, setStart] = useState('')
    const [agendamento_datetime_end, setEnd] = useState('') 
    const [fkCliente, setfkCliente] = useState({})
    const [fkServico, setfkServico] = useState({})
    const [fkFuncionario, setfkFuncionario] = useState({})

    function addComponent(data, index) {

        

        if(index===undefined){
            index = indexController + 1
        }

        const newComponent = (
            <Payment 
                key={payment.length} 
                id={data.pagamento_id}
                setIndexToRemove={setIndexToRemove}
                data={data}
                index={index}
                onValorChange={atualizaValor}
                onMetodoChange={atualizaMetodo}
            />
        )   
        
        if(data.pagamento_id) {
            atualizaValor(index, data.pagamento_valor)
            atualizaMetodo(index, data.pagamento_metodo)
            atualizaIdPagamento(index, data.pagamento_id)
        }
        
        setIndexController(index)
        setPayment(prevPayment => [...prevPayment, newComponent]);
    
    }

    function atualizaValor(ind, novoValor) {
        setValoresPagamento((prevValores) => {
            const novosValores = [...prevValores];
            novosValores[ind].valor = parseFloat(novoValor);
            return novosValores;
        });
    }

    function atualizaMetodo(ind, novoMetodo) {
        setMetodosPagamento((prevMetodos) => {
            const novosMetodos = [...prevMetodos];
            novosMetodos[ind].metodo = novoMetodo;
            return novosMetodos;
        });
    }

    function atualizaIdPagamento(ind, id) {
        setIdsPagamento((prevIds) => {
            const novosIds = [...prevIds];
            novosIds[ind].id = id;
            return novosIds;
        });
    }

    function removeComponent(pagamento_id) {
        const updatedPayment = [...payment]; // Cria uma cópia do estado payment
        updatedPayment.splice(indexToRemove, 1); // Remove o item do array
        setPayment(updatedPayment); // Atualiza o estado payment

        //const updatedPayment = [...payment]
        //let removeIndex = updatedPayment.findIndex((pay) => pay.pagamento_id === indexToRemove)
        //updatedPayment.splice(removeIndex, 1);
        //setPayment(updatedPayment)

        setValoresPagamento((prevValores) => {
            const removeValor = [...prevValores];
            removeValor[indexToRemove] = { valor: 0 };
            return removeValor;
        });


        setMetodosPagamento((prevMetodos) => {
            const removeMetodo = [...prevMetodos];
            removeMetodo[indexToRemove] = { metodo: '' };
            return removeMetodo;
        });

        setIdsPagamento((prevIdsPagamento) => {
            const removeId = [...prevIdsPagamento];
            removeId[indexToRemove] = { id: null };
            return removeId;
        });

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

    async function createPayment(index, agendamentoId) {
        let res = await api.post(`/pagamento`, {
            agendamento_id: agendamentoId,
            dividido: 0,
            valor_dividido: null,
            pagamento_metodo: metodosPagamento[index].metodo,
            pagamento_valor: valoresPagamento[index].valor
        })

        return res.data
    }

    async function updatePayment(index, id) {
        let res = await api.post(`/pagamento/${id}`, {
            pagamento_id: id,
            dividido: 0,
            valor_dividido: null,
            pagamento_metodo: metodosPagamento[index].metodo,
            pagamento_valor: valoresPagamento[index].valor
        })

        return res.data
    }

    async function deletePayment() {
        let idsToDelete = []
        let list = payMethods.filter(item => item.agendamento_id === selected.agendamento_id)
        for (let pay of list) {
            let found = idsPagamento.findIndex((el) => el.id === pay.pagamento_id)
            if(found === -1) {
                let res = await api.delete(`/pagamento/${pay.pagamento_id}`)
                idsToDelete.push(pay.pagamento_id)
            }
        }

        return idsToDelete
    }

    async function verifyPayment(agendamentoId) {
        let resPay = []
        for (const [index, item] of valoresPagamento.entries()) {
            if(valoresPagamento[index].valor !== 0 && idsPagamento[index].id === null){
                let res = await createPayment(index, agendamentoId)
                resPay.push(res)
            } else if(valoresPagamento[index].valor !== 0 && idsPagamento[index].id !== null){
                let res = await updatePayment(index, idsPagamento[index].id)
                resPay.push(res)
            }
        }

        return resPay

    }

    async function handleSave() {

        if(Array.isArray(selected)) {
            let res = await createDataInBackend()
            let resPay = await verifyPayment(res.data.agendamento_id)
            onSave(res.data, fkCliente, fkServico, fkFuncionario)
            handlePayments(resPay)
        } else {
            let res = await updateDataInBackend()
            let resPay = await verifyPayment()
            let idsToDelete = await deletePayment()
            onUpdate(res.data, fkCliente, fkServico, fkFuncionario)
            handlePayments(resPay, idsToDelete)
            clearAll()
            openModal()
        }

    }

    async function handleDeleteAgendamento() {

        let res = await deleteDataFromBackend()
        if(res){
            onDeleteAgendamento()
            openModal()
            clearSelected()
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
        setStart('')
        setEnd('')
        setPayment([])
        //setPayList([])
        setAddButton(true)
        setIndexToRemove(null)
        setIndexController(0)
        setValoresPagamento([
            { valor: 0 },
            { valor: 0 },
            { valor: 0 }
        ])
        setMetodosPagamento([
            { metodo: '' },
            { metodo: '' },
            { metodo: '' }
        ])
        setIdsPagamento([
            { id: null },
            { id: null },
            { id: null }
        ])
    }

    function handleCliente(value) {
        setCliente(value)
        let select = clientes.find(cliente => cliente.cliente_id == value)
        setfkCliente(select)
    }

    function handleServico(value) {
        setServico(value)
        let select = servicos.find(servico => servico.servico_id == value)
        setfkServico(select)
    }

    function handleFuncionario(value) {
        setFuncionario(value)
        let select = funcionarios.find(funcionario => funcionario.funcionario_id == value)
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

        if(selected){
            let list = payMethods.filter(item => item.agendamento_id === selected.agendamento_id)

            if(list) {
                list.forEach((data, index) => {addComponent(data, index)});
            }

            //setPayList(prevPayList => [...prevPayList, payMethods.filter(item => item.agendamento_id === selected.agendamento_id)])

            //if(payList) {
                //payList.map((data, index) => (addComponent(data, index)));
            //}

            handleCliente(selected.cliente_id)
            handleServico(selected.servico_id)
            handleFuncionario(selected.funcionario_id)

            if (selected.start) {
                setStart(dateFormat(selected.start).toISOString().slice(0, 16));
                setEnd(dateFormat(selected.end).toISOString().slice(0, 16));
            } 
            
        } 
        
    }, [selected])

    useEffect(() => {
        if (payment.length === 3) {
            setAddButton(false);
        } else {
            setAddButton(true);
        }
    }, [payment]);

    useEffect(() => {
        handleHorario(selectedDateTime)
    }, [selectedDateTime]);

    useEffect(() => {
        removeComponent()
    }, [indexToRemove])

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
                        {payment.map((component, index) => (
                            <div key={index}>
                                {component}
                            </div>
                        ))}
                        {addButton && (
                            <div className='modal-add-pay' onClick={addComponent}>
                                <div className='modal-add-pay-button'>+</div>
                                <p className='modal-add-pay-label'>Adicionar pagamento</p>
                            </div>
                        )}
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