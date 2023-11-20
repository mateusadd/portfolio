import React, {useState, useEffect} from 'react';
import "./Modal.css";
import api from '../../services/api'
import { dateFormat } from '../../utils/dateFormat';
import Payment from '../Payment/Payment';

const Modal = ({ isOpen, openModal, onSave, onUpdate, handlePayments, onDeleteAgendamento, selected, clientes, servicos, funcionarios, payMethods, setPayMethods, clearSelected, selectedDateTime, clearSelectedDateTime }) => {

    console.log(payMethods)
    
    const [valoresPagamento, setValoresPagamento] = useState([])

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
    const [valor, setValor] = useState('');
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [listOfPayments, setListofPayments] = useState([])

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

    async function handleCreatePayment() {
        const res = await createPayment();
        setPayMethods(prevList => [...prevList, res]);
        return res;
      }
      
    async function handleDeletePayment(id) {
        await deletePayment(id);
        setPayMethods(prevList => prevList.filter(payment => payment.pagamento_id !== id));
    }

    async function getCorrespondingPayments() {
        let res = await api.get(`/pagamento?agendamento_id=${selected.agendamento_id}`)
        return res.data
    }

    async function deleteDataFromBackend() {

        if(payment.length > 0) {
            if(window.confirm(`Deletar este agendamento apagará os registros de pagamento correspondentes. Deseja mesmo continuar?`)){
                
                let response = await getCorrespondingPayments()
                let idsToDelete = []
                for(let item of response) {
                    await api.delete(`/pagamento/${item.pagamento_id}`)
                    idsToDelete.push(item.pagamento_id)
                }
                handlePayments([], idsToDelete)
                return await api.delete(`/agendamento/${selected.agendamento_id}`)

                
                
            }
        } else {
            if(window.confirm(`Quer mesmo excluir este agendamento?`)){
                return await api.delete(`/agendamento/${selected.agendamento_id}`)
            }
        }

    }

    async function createPayment() {
        let res = await api.post(`/pagamento`, {
            agendamento_id: selected.agendamento_id,
            dividido: 0,
            valor_dividido: null,
            pagamento_metodo: metodoPagamento,
            pagamento_valor: valor
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

    async function deletePayment(pagamento_id) {
        let res = await api.delete(`/pagamento/${pagamento_id}`)
        return res.data
    }

    /* async function verifyPayment(agendamentoId) {
        let resPay = []
        for (const [index, item] of valoresPagamento.entries()) {
            if(valoresPagamento[index].valor !== 0 && idsPagamento[index].id === null){
                let res = await createPayment(agendamentoId)
                resPay.push(res)
            } else if(valoresPagamento[index].valor !== 0 && idsPagamento[index].id !== null){
                let res = await updatePayment(index, idsPagamento[index].id)
                resPay.push(res)
            }
        }

        return resPay

    } */

    function verifyTotalPayment() {
        let valoresSoma = 0

        for(let [index, item] of valoresPagamento.entries()) {
            valoresSoma += valoresPagamento[index].valor
        }

        return valoresSoma
    }

    function verifyMethods() {
        let metodo = ''
        let status = false

        for(let [index, item] of metodosPagamento.entries()) {
            if(metodosPagamento[index].metodo !== '') {
                if(metodosPagamento[index].metodo === metodo) {
                    status = true
                }
                metodo = metodosPagamento[index].metodo
            }
        }

        return status
    }

    async function saveInformation() {
        if(Array.isArray(selected)) {
            let res = await createDataInBackend()
            onSave(res.data, fkCliente, fkServico, fkFuncionario)
            clearAll()
            openModal()
        } else {
            let res = await updateDataInBackend()
            onUpdate(res.data, fkCliente, fkServico, fkFuncionario)
            clearAll()
            openModal()
        }
    }

    async function handleSave() {
        
        if(payment.length > 0 && (fkServico.servico_preco !== verifyTotalPayment())) {

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
        setListofPayments([])
        setStart('')
        setEnd('')
        setPayment([])
        //setPayList([])
        setAddButton(true)
        setValor('')
        setMetodoPagamento('')
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
        if(select) {setValor(select.servico_preco)}
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

            setListofPayments(payMethods.filter(item => item.agendamento_id === selected.agendamento_id))

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
                            valor={valor}
                            setValor={setValor}
                            metodoPagamento={metodoPagamento}
                            listOfPayments={listOfPayments}
                            setMetodoPagamento={setMetodoPagamento}
                            handleCreatePayment={handleCreatePayment}
                            handleDeletePayment={handleDeletePayment}
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