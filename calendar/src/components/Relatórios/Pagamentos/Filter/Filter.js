import './Filter.css';


function Filter({ metodoPagamento, handleFilterMetodoPagamento, handleFilterStart, handleFilterEnd, handleGerarRelatorio }) {
    return (
        <div className='options-bar'>
            <p className='filter-label'>Método</p>
            <select className='select' id='metodoPagamento' name='metodoPagamento' value={metodoPagamento} onChange={e => handleFilterMetodoPagamento(e.target.value)}>
                <option value=""></option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Credito">Crédito</option>
                <option value="Debito">Débito</option>
            </select>
            <p className='filter-label'>Data Início</p>
            <input className='select' type='date' id='filter-start' name='filter-start' onChange={e => handleFilterStart(e.target.value)}/>
            <p className='filter-label'>Data Término</p>
            <input className='select' type='date' id='filter-end' name='filter-end' onChange={e => handleFilterEnd(e.target.value)}/>
            <button className='button' onClick={handleGerarRelatorio}>Gerar Relatório</button>
        </div>
    );
}

export default Filter;