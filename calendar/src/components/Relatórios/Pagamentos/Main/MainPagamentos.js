import './MainPagamentos.css';
import { useState, useEffect } from 'react';
import api from '../../../../services/api'

import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header';
import Filter from '../Filter/Filter'
import Report from '../Report/Report'
import Footer from '../Footer/Footer'

function MainPagamentos() {

    const [metodoPagamento, setMetodoPagamento] = useState('')
    const [filterStart, setFilterStart] = useState('')
    const [filterEnd, setFilterEnd] = useState('')
    const [results, setResults] = useState([])
    const [somaPagamentos, setSomaPagamentos] = useState(0)

    function  handleFilterMetodoPagamento(value) {
        setMetodoPagamento(value)
    }

    function  handleFilterStart(value) {
        setFilterStart(value)
    }

    function  handleFilterEnd(value) {
        setFilterEnd(value)
    }

    async function handleGerarRelatorio() {

        setSomaPagamentos(0)

        let res = await api.get(`/pagamentos`, {
            params: {
                metodoPagamento: metodoPagamento,
                filterStart: filterStart,
                filterEnd: filterEnd
            }
        })

        setResults(res.data)
    }

    useEffect(() => {
        const novaSoma = results.reduce((total, data) => total + data.pagamento_valor, 0);
        setSomaPagamentos(novaSoma);
    }, [results]);

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className='reports-main'>
        <Filter
            metodoPagamento={metodoPagamento}
            handleFilterMetodoPagamento={handleFilterMetodoPagamento}
            handleFilterStart={handleFilterStart}
            handleFilterEnd={handleFilterEnd}
            handleGerarRelatorio={handleGerarRelatorio}
        />
        <Report
            results={results}
            somarPagamentos={setSomaPagamentos}
        />
        <Footer 
            pagamentos={somaPagamentos}
        />
    </div>
    </>
  );
}

export default MainPagamentos;