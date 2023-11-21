import './Report.css';
import { dateFormatReport } from '../../../../utils/dateFormat';
import { aggregateReports } from '../../../../utils/aggregateReports';
import { formatValues } from '../../../../utils/formatValues';
import { useEffect, useState } from 'react';
import api from '../../../../services/api'
//import moment from 'moment';

function Report({results, somarComissoes}) {

    let soma = 0

    if(results.length > 0) {

        results = aggregateReports(results)

        results.forEach(data => {
            soma += (data.pagamento_valor * (data.agendamento.servico.servico_comissao / 100))
        });

        // Pass the total commission to the parent component
        somarComissoes(soma);

        return (
            <>
                <div className='reports'>
                    <table className='report-table'>
                        <thead>
                            <tr>
                                <th>Data do Pagamento</th>
                                <th>Serviço</th>
                                <th>Valor do Pagamento</th>
                                <th>Comissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((data, index) => {

                                let comissao = data.pagamento_valor * (data.agendamento.servico.servico_comissao / 100);

                                return (
                                    <tr key={index}>
                                        <td>{dateFormatReport(data.agendamento.agendamento_datetime_start)}</td>
                                        <td>{data.agendamento.servico.servico_nome}</td>
                                        <td>R$ {formatValues(data.pagamento_valor)}</td>
                                        <td>R$ {formatValues(comissao)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

}

export default Report;