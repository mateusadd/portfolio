import './Report.css';
import { dateFormatReport } from '../../../../utils/dateFormat';
import { aggregateReports } from '../../../../utils/aggregateReports';
import { formatValues } from '../../../../utils/formatValues';
import { useEffect, useState } from 'react';
import api from '../../../../services/api'
//import moment from 'moment';

function Report({results, somarComissoes}) {

    var soma = 0

    useEffect(() => {
        // Atualiza o estado de somaComissoes no componente Main
        somarComissoes(soma);
    }, [soma, somarComissoes]);

    if(results.length > 0) {

        results = aggregateReports(results)

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
                                soma += comissao;

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