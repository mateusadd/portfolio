import React from 'react';
import './Payment.css'
import {AiFillDelete} from 'react-icons/ai'
import { useState } from 'react';

function Payment({ id, setIndexToRemove, data, index, onValorChange, onMetodoChange }) {
    const [valor, setValor] = useState(data.pagamento_valor)
    const [metodo, setMetodo] = useState(data.pagamento_metodo)

    const handleChangeValor = (e) => {
        let novoValue = e.target.value;
        setValor(novoValue)
        onValorChange(index, novoValue);
    };

    const handleChangeMetodo = (e) => {
        let novoMetodo = e.target.value;
        setMetodo(novoMetodo);
        onMetodoChange(index, novoMetodo);
    };

    function handleDelete() {
        setIndexToRemove(index)
    }

    return (
        <div className='modal-payment'>
            <div className='payment-body'>
                <div className='payment-input'>
                    <p className='payment-label'>Valor: </p>
                    <input className='payment-field' type='text' value={valor} onChange={handleChangeValor} />
                </div>
                <div className='payment-input'>
                    <p className='payment-label'>Método de pagamento: </p>
                    <select className='payment-field' value={metodo} onChange={handleChangeMetodo}>
                        <option value=""></option>
                        <option value="Método1">Primeiro</option>
                        <option value="Segundo">Segundo</option>
                        <option value="Terceiro">Terceiro</option>
                    </select>
                </div>
            </div>
            <div className='payment-delete' onClick={handleDelete}>
                <AiFillDelete size={15} color='#fff' />
            </div>
        </div>
    );
}

export default Payment;