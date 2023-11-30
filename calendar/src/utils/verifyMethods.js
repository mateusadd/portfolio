export function verifyMethods(pagamentos) {
    let metodo = ''
    let status = false

    for(let [index] of pagamentos.entries()) {
        if(pagamentos[index].metodoPagamento === metodo) {
            status = true
        }
        metodo = pagamentos[index].metodoPagamento
    }

    return status
}