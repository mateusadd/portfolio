import './ClienteCard.css';

function ClienteCard({key, data, onClick}) {

    const handleKeyPress = (event) => {
        // Verifica se a tecla pressionada é a tecla Enter (código 13)
        if (event.key === 'Enter') {
          onClick();
        }
      };

  return (
    <div className="cliente-card" onClick={onClick} onKeyPress={handleKeyPress} tabIndex={0} role="button">

        <ul className="cliente-properties">
            <li>
                {data.cliente_nome}
            </li>
            <li>
                {data.cliente_contato}
            </li>
            <li>
                {data.funcionario !== true ? 'Não' : 'Sim'}
            </li>
        </ul>

    </div>
  );
}

export default ClienteCard;