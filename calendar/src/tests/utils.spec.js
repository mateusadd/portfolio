import { dateFormat, dateFormatReport } from "../utils/dateFormat";
import { formatValues } from "../utils/formatValues";
import { verifyMethods } from "../utils/verifyMethods";
import { verifyTotalPayment } from "../utils/verifyTotalPayment";

describe('Testando funções auxiliares', () => {
    it('dateFormat deve retornar a data com 3 horas subtraídas', () => {
        const currentDate = new Date()
        const expectedDate = new Date(currentDate);
        expectedDate.setHours(currentDate.getHours() - 3);

        expect(dateFormat(currentDate.toISOString())).toEqual(expectedDate);
    })

    it('dateFormat deve retornar NaN', () => {
        const invalidDate = 'data_invalida';
        expect(isNaN(dateFormat(invalidDate).valueOf())).toBe(true);
    })

    it('dateFormatReport retorna a data formatada como string', () => {
        const inputDate = new Date;
        const expectedDateString = new Date(inputDate).toLocaleDateString();
    
        expect(dateFormatReport(inputDate)).toEqual(expectedDateString);
    });

    it('dateFormatReport deve retornar NaN', () => {
        const invalidDate = 'data_invalida';
        expect(isNaN(dateFormatReport(invalidDate).valueOf())).toBe(true);
    })

    it('formatValues deve retornar valor formatado', () => {
        const inputValor = 3.14;
        const expectedValor = '3,14';
        expect(formatValues(inputValor)).toEqual(expectedValor);
    })

    it('verifyMethods deve retornar status true', () => {
        const inputPagamentos = [
            {
                id: 1,
                metodoPagamento: "Dinheiro",
                valor: 25
            },
            {
                id: 2,
                metodoPagamento: "Dinheiro",
                valor: 30
            }
        ];
        expect(verifyMethods(inputPagamentos)).toEqual(true);
    })

    it('verifyTotalPayment deve retornar soma correta', () => {
        const inputPagamentos = [
            {
                id: 1,
                metodoPagamento: "Dinheiro",
                valor: 25
            },
            {
                id: 2,
                metodoPagamento: "Dinheiro",
                valor: 30
            }
        ];
        expect(verifyTotalPayment(inputPagamentos)).toEqual(55);
    })
})