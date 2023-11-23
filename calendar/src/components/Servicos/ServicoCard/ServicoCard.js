import './ServicoCard.css';
import { useEffect, useState } from 'react';
import api from '../../../services/api'
import moment from 'moment';

import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';

function ServicoCard({key, data, onClick}) {

  return (
    <>
        <div className="servico-card" onClick={onClick}>

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