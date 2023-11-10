import './MainComissoes.css';
import { useEffect, useState } from 'react';
import api from '../../../../services/api'
//import moment from 'moment';

import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header';
import Filter from '../Filter/Filter'
import Report from '../Report/Report'
import Footer from '../Footer/Footer'

function MainComissoes(props) {

    const [funcionario, setFuncionario] = useState('')
    const [filterStart, setFilterStart] = useState('')
    const [filterEnd, setFilterEnd] = useState('')
    const [results, setResults] = useState([])
    const [somaComissoes, setSomaComissoes] = useState(0)

    function  handleFilterFuncionario(value) {
        setFuncionario(value)
    }

    function  handleFilterStart(value) {
        setFilterStart(value)
    }

    function  handleFilterEnd(value) {
        setFilterEnd(value)
    }

    async function handleGerarRelatorio() {

        let res = await api.get(`/comissoes`, {
            params: {
                funcionario: funcionario,
                filterStart: filterStart,
                filterEnd: filterEnd
            }
        })

        setResults(res.data)
    }

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className='reports-main'>
        <Filter
            funcionario={funcionario}
            handleFilterFuncionario={handleFilterFuncionario}
            handleFilterStart={handleFilterStart}
            handleFilterEnd={handleFilterEnd}
            handleGerarRelatorio={handleGerarRelatorio}
            funcionarios={props.funcionarios}
        />
        <Report
            results={results}
            somarComissoes={setSomaComissoes}
        />
        <Footer 
            comissoes={somaComissoes}
        />
    </div>
    </>
  );
}

export default MainComissoes;