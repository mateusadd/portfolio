import './Report.css';
import { dateFormatReport } from '../../../../utils/dateFormat';
import { aggregateReports } from '../../../../utils/aggregateReports';
import { formatValues } from '../../../../utils/formatValues';

function Report({results, somarPagamentos}) {

    let soma = 0

    if(results.length > 0) {

        results = aggregateReports(results)

        results.forEach(data => {
            soma += data.pagamento_valor
        });

        // Pass the total commission to the parent component
        somarPagamentos(soma);

        return (
            <div className='reports'>
                <table className='report-table'>
                    <thead>
                        <tr>
                            <th>Data do Pagamento</th>
                            <th>Serviço</th>
                            <th>Valor do Pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((data) => {
                            return (
                                <tr key={data.pagamento_id}>
                                    <td>{dateFormatReport(data.agendamento.agendamento_datetime_start)}</td>
                                    <td>{data.agendamento.servico.servico_nome}</td>
                                    <td>R$ {formatValues(data.pagamento_valor)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Report;