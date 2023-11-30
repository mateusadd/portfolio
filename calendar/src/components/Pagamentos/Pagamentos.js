import React, { useEffect } from 'react';
import { formatValues } from '../../utils/formatValues';
import { v4 as uuidv4 } from 'uuid';

import './Pagamentos.css'

function Pagamentos({pagamentos, setPagamentos, valor, setValor, metodoPagamento, setMetodoPagamento, listOfPayments, setIdsToDelete}) {

  const adicionarItem = async () => {
    if (pagamentos.length >= 3) {
      return;
    }

    if (valor && metodoPagamento) {
      // NOSONAR
      const novoPagamento = {
        id: pagamentos.id || uuidv4(),
        valor: parseFloat(valor),
        metodoPagamento: metodoPagamento
      };

      setPagamentos((prevPagamentos) => [...prevPagamentos, novoPagamento]);
      setValor('');
      setMetodoPagamento('');

    } else {

      alert('Preencha todos os campos antes de adicionar o pagamento.');

    }
  };

  function handleChangePagamento(value) {
    setMetodoPagamento(value);
  }

  const handleRemoverPagamento = async (id) => {
    setIdsToDelete((prevIds) => [...prevIds, id]);
    const novoPagamento = pagamentos.filter((item) => item.id !== id);
    setPagamentos(novoPagamento);
  };

  useEffect(() => {
    if (listOfPayments.length > 0) {
      const payments = listOfPayments.map((payment) => ({
        id: payment.pagamento_id,
        valor: parseFloat(payment.pagamento_valor),
        metodoPagamento: payment.pagamento_metodo
      }));

      setPagamentos((prevPagamento) => [...prevPagamento, ...payments]);
    }
  }, [listOfPayments]);

  return (
    <div>
      <div>
        <p>Valor:</p>
        <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
        <p>Método de Pagamento:</p>
        <select type="text" value={metodoPagamento} onChange={(e) => handleChangePagamento(e.target.value)}>
          <option value=""></option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Pix">Pix</option>
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
        </select>
        <button onClick={adicionarItem}>Adicionar</button>
      </div>
      <div>
        {pagamentos.length === 0 ? (
          <p>Adicionar Pagamento</p>
        ) : (
          <ul>
            {pagamentos.map((item) => (
              <li key={item.id}>
                <p>Valor: R$ {formatValues(item.valor)}</p>
                <p>Método de Pagamento: {item.metodoPagamento}</p>
                <button onClick={() => handleRemoverPagamento(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pagamentos;
