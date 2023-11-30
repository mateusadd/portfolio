import './ServicoCard.css';

function ServicoCard({key, data, onClick}) {

    const handleKeyPress = (event) => {
        // Verifica se a tecla pressionada é a tecla Enter (código 13)
        if (event.key === 'Enter') {
          onClick();
        }
      };

  return (
    <>
        <div className="servico-card" onClick={onClick} onKeyPress={handleKeyPress} tabIndex={0} role="button">

            <ul className="servico-properties">
                <li>
                    {data.servico_nome}
                </li>
                <li>
                    {data.servico_preco}
                </li>
                <li>
                    {data.servico_comissao}
                </li>
            </ul>

        </div>
    </>
  );
}

export default ServicoCard;