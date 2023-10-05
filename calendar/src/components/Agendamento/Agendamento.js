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

function Agendamento() {

  const [calendar, setCalendar] = useState([])
  const [selectedDateTime, setSelectedDateTime] = useState('2023-06-06T12:00')
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [clientes, setClientes] = useState([])
  const [servicos, setServicos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])
  const [payMethods, setPayMethods] = useState([])

async function getCalendar() {
  let res = await api.get('/agendamento')
  var events = []
  {res.data.map(t => (
    t.agendamento_datetime_start = new Date(t.agendamento_datetime_start),
    t.agendamento_datetime_end = new Date(t.agendamento_datetime_end),

    events.push({
      title: `${t.cliente.cliente_nome} - ${t.servico.servico_nome}`,
      start: t.agendamento_datetime_start,
      end: t.agendamento_datetime_end,
      cliente: t.cliente,
      servico: t.servico,
      funcionario: t.funcionario,
      agendamento_id: t.agendamento_id

    })
  ))}

  setCalendar(events)
}

async function getClientes() {
  let res = await api.get('/cliente')
  setClientes(res.data)
}

async function getServicos() {
  let res = await api.get('/servico')
  setServicos(res.data)
}

async function getFuncionarios() {
  let res = await api.get('/funcionario')
  setFuncionarios(res.data)
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
    servico: fkServico,
    funcionario: fkFuncionario,
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
    servico: fkServico,
    funcionario: fkFuncionario,
    agendamento_id: response.agendamento_id
  }

  const indexToUpdate = calendar.findIndex((evento) => evento.agendamento_id === newData.agendamento_id)

  let updatedCalendar = [...calendar]
  updatedCalendar[indexToUpdate] = newData
  setCalendar(updatedCalendar)

}

const onDelete = () => {
  setCalendar(calendar.filter(ev => ev.agendamento_id !== selected.agendamento_id))
}

const eventStyleGetter = (event, start, end, isSelected) => {
  // Aqui você pode personalizar o estilo do evento com base nas propriedades do evento,
  // como o funcionário associado a ele.
  const funcionarioId = event.funcionario.funcionario_id;

  // Suponha que você tenha uma lista de cores associadas a cada funcionário.
  const coresFuncionarios = {
    1: 'red',
    2: 'blue'
    // Adicione mais cores e associações conforme necessário.
  };

  const backgroundColor = coresFuncionarios[funcionarioId] || 'gray';

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
  setModalOpen(true);
};

useEffect(() => {
  getCalendar()
  getClientes()
  getServicos()
  getFuncionarios()
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
          style={{ height: 670 }}
          eventPropGetter={eventStyleGetter}
        />
        <Modal
          isOpen={modalOpen} 
          openModal={() => setModalOpen(!modalOpen)}
          onSave={onSave}
          onUpdate={onUpdate}
          onDelete={onDelete}
          selected={selected}
          clientes={clientes}
          servicos={servicos}
          funcionarios={funcionarios}
          payMethods={payMethods}
          clearSelected={() => setSelected([])}
          selectedDateTime={moment(selectedDateTime).format('YYYY-MM-DDTHH:mm')}
          clearSelectedDateTime={() => setSelectedDateTime(null)}
        />
      </div>
    </>
  );
}

export default Agendamento;