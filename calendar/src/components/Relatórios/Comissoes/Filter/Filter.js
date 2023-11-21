import './Filter.css';


function Filter({ funcionario, handleFilterFuncionario, handleFilterStart, handleFilterEnd, handleGerarRelatorio, funcionarios }) {
    return (
        <div className='options-bar'>
            <p className='filter-label'>Funcionário</p>
            <select className='select' id='funcionario' name='funcionario' value={funcionario} onChange={e => handleFilterFuncionario(e.target.value)}>
                <option value=""></option>
                {funcionarios.map(funcionario => (
                    <option key={funcionario.funcionario_id} value={funcionario.funcionario_id}>{funcionario.funcionario_nome}</option>
                ))}
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