export function aggregateReports(results) {
    if (results.length > 0) {
        // Agrega os valores dos pagamentos por agendamento_id
        const aggregatedResults = Object.values(results.reduce((acc, data) => {
            const agendamentoId = data.agendamento.agendamento_id;

            if (acc[agendamentoId]) {
                acc[agendamentoId].pagamento_valor += data.pagamento_valor;
            } else {
                acc[agendamentoId] = { ...data, pagamento_valor: data.pagamento_valor };
            }

            return acc;
        }, {}))

        return aggregatedResults
    }
}