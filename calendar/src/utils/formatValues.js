export function formatValues(valor) {
    valor = valor.toFixed(2)
    let valorFormatado = valor.toString().replace(/\./g, ',')

    return valorFormatado
}