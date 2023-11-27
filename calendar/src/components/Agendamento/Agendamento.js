import './Agendamento.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import api from '../../services/api'
import { format, parse, startOfWeek, getDay } from "date-fns"
import moment from 'moment';

import Modal from '../Modal/Modal';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const locales = {
	"pt-BR": require("date-fns")
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
});

function Agendamento(props) {

  const [calendar, setCalendar] = useState([])
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [payMethods, setPayMethods] = useState([])

async function getCalendar() {
  let res = await api.get('/agendamento')
  let events = []

  res.data.map(t => (
    t.agendamento_datetime_start = new Date(t.agendamento_datetime_start),
    t.agendamento_datetime_end = new Date(t.agendamento_datetime_end),

    events.push({
      agendamento_id: t.agendamento_id,
      cliente_id: t.cliente_id,
      servico_id: t.servico_id,
      funcionario_id: t.funcionario_id,
      start: t.agendamento_datetime_start,
      end: t.agendamento_datetime_end,
      cliente: t.cliente,
      servico: t.servico,
      funcionario: t.funcionario,
      title: `${t.cliente.cliente_nome} - ${t.servico.servico_nome}`,

    })
  ))

  setCalendar(events)
}

async function getPayMethods() {
  let res = await api.get('/pagamento')
  setPayMethods(res.data)
}

const onSave = (response, fkCliente, fkServico, fkFuncionario) => {
  let newData = {
    title: `${fkCliente.cliente_nome} - ${fkServico.servico_nome}`,
    start: new Date(response.agendamento_datetime_start),
    end: new Date(response.agendamento_datetime_end),
    cliente: fkCliente,
    cliente_id: fkCliente.cliente_id,
    servico: fkServico,
    servico_id: fkServico.servico_id,
    funcionario: fkFuncionario,
    funcionario_id: fkFuncionario.funcionario_id,
    agendamento_id: response.agendamento_id
  }
  
  setCalendar([...calendar, newData])
  setModalOpen(false)
}

const onUpdate = (response, fkCliente, fkServico, fkFuncionario) => {

  let newData = {
    title: `${fkCliente.cliente_nome} - ${fkServico.servico_nome}`,
    start: new Date(response.agendamento_datetime_start),
    end: new Date(response.agendamento_datetime_end),
    cliente: fkCliente,
    cliente_id: fkCliente.cliente_id,
    servico: fkServico,
    servico_id: fkServico.servico_id,
    funcionario: fkFuncionario,
    funcionario_id: fkFuncionario.funcionario_id,
    agendamento_id: response.agendamento_id
  }

  const indexToUpdate = calendar.findIndex((evento) => evento.agendamento_id == newData.agendamento_id)

  let updatedCalendar = [...calendar]
  updatedCalendar[indexToUpdate] = newData
  setCalendar(updatedCalendar)

}

function updatePaymentsList(resPay) {
  resPay.forEach(element => {
    let paymentIndex = payMethods.findIndex((pay) => pay.pagamento_id === element.pagamento_id)
    if(paymentIndex === -1){
      setPayMethods(prevPayMethods => [...prevPayMethods, element])
    } else {
      setPayMethods((prevPayMethods) => {
        const updatedPayMethod = [...prevPayMethods];
        updatedPayMethod[paymentIndex] = element;
        return updatedPayMethod;
      });
    }
  })
}

function deleteFromPaymentsList(idsToDelete) {

  if(idsToDelete) {
    idsToDelete.forEach(element => {
      let paymentIndex = payMethods.findIndex((pay) => pay.pagamento_id === element)
      if(paymentIndex !== -1){
        setPayMethods((prevPayMethods) => {
          const updatedPayMethod = [...prevPayMethods];
          updatedPayMethod.splice(paymentIndex, 1)
          return updatedPayMethod;
        });
      }
    })
  }
  
}

function handlePayments(resPay, idsToDelete) {
  updatePaymentsList(resPay)
  deleteFromPaymentsList(idsToDelete)
}

const onDeleteAgendamento = () => {
  setCalendar(calendar.filter(ev => ev.agendamento_id !== selected.agendamento_id))
}

const eventStyleGetter = (event, start, end, isSelected) => {

  const backgroundColor = event.funcionario.funcionario_cor || 'gray';

  return {
    style: {
      backgroundColor,
    },
  };

};

const handleSelected = (event) => {
  setSelected(event);
  setModalOpen(true)
}

const handleSelectSlot = (slotInfo) => {
  // slotInfo contém a data e hora selecionadas
  const { start } = slotInfo;
  setSelectedDateTime(start);
  setModalOpen(true)
};

useEffect(() => {
  getCalendar()
  getPayMethods()
}, [])

  return (
    <>
    <Header/>
    <Sidebar/>
      <div className='calendar'>
        <Calendar
          selected={selected}
          onSelectEvent={handleSelected}
          onSelectSlot={handleSelectSlot}
          localizer={localizer}
          events={calendar}
          defaultView='day'
          min={new Date(2023, 1, 0, 7, 0, 0)} 
          max={new Date(2023, 1, 0, 19, 0, 0)}
          selectable
          popup
          style={{ height: 804 }}
          eventPropGetter={eventStyleGetter}
        />
        <Modal
          isOpen={modalOpen} 
          openModal={() => setModalOpen(!modalOpen)}
          onSave={onSave}
          onUpdate={onUpdate}
          handlePayments={handlePayments}
          onDeleteAgendamento={onDeleteAgendamento}
          selected={selected}
          clientes={props.clientes}
          servicos={props.servicos}
          funcionarios={props.funcionarios}
          payMethods={payMethods}
          setPayMethods={setPayMethods}
          clearSelected={() => setSelected([])}
          selectedDateTime={selectedDateTime
            ? moment(selectedDateTime).format("YYYY-MM-DDTHH:mm")
            : null}
          clearSelectedDateTime={() => setSelectedDateTime(new Date())}
        />
      </div>
    </>
  );
}

export default Agendamento;