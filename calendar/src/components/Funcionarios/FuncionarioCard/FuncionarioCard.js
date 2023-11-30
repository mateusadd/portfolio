import './FuncionarioCard.css';

function FuncionarioCard({key, data, onClick}) {

    const handleKeyPress = (event) => {
        // Verifica se a tecla pressionada é a tecla Enter (código 13)
        if (event.key === 'Enter') {
          onClick();
        }
      };

  return (
    <div className="funcionario-card" onClick={onClick} onKeyPress={handleKeyPress} tabIndex={0} role="button">

        <ul className="funcionario-properties">
            <li>
                {data.funcionario_nome}
            </li>
            <li>
                {data.funcionario_contato}
            </li>
            <li>
                <div className="funcionario-cor-dot" style={{ backgroundColor: data.funcionario_cor }}></div>
            </li>
        </ul>

    </div>
  );
}

export default FuncionarioCard;