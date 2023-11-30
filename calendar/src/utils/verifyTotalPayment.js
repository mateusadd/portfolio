export function verifyTotalPayment(pagamentos) {
    let valoresSoma = 0

    for(let [index] of pagamentos.entries()) {
        valoresSoma += pagamentos[index].valor
    }

    return valoresSoma
}