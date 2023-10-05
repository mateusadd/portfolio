import React from 'react';
import './Payment.css'
import {AiFillDelete} from 'react-icons/ai'
import { useState } from 'react';

function Payment({ onRemove, data }) {
    const [valor, setValor] = useState(data.pagamento_valor)
    const [metodo, setMetodo] = useState(data.pagamento_metodo)

    return (
        <div className='modal-payment'>
            <div className='payment-body'>
                <div className='payment-input'>
                    <p className='payment-label'>Valor: </p>
                    <input className='payment-field' type='text' defaultValue={`R$ ${valor}`} onChange={(event) => setValor(event.target.value)} />
                </div>
                <div className='payment-input'>
                    <p className='payment-label'>Método de pagamento: </p>
                    <select className='payment-field' defaultValue={metodo} onChange={(event) => setMetodo(event.target.value)}>
                        <option value=""></option>
                        <option value="Método1">Primeiro</option>
                        <option value="Segundo">Segundo</option>
                        <option value="Terceiro">Terceiro</option>
                    </select>
                </div>
            </div>
            <div className='payment-delete' onClick={onRemove}>
                <AiFillDelete size={15} color='#fff' />
            </div>
        </div>
    );
}

export default Payment;