import React, { useState, useEffect } from 'react';
import {formatValues} from '../../utils/formatValues'

const CarrinhoCompras = ({ valor, setValor, metodoPagamento, setMetodoPagamento, listOfPayments, handleCreatePayment, handleDeletePayment }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [valorController, setValorController] = useState(0)

  function handleChangePagamento(value) {
    setMetodoPagamento(value)

  }

  useEffect(() => {
    if (listOfPayments.length > 0) {
      const payments = listOfPayments.map(payment => ({
        id: payment.pagamento_id,
        valor: parseFloat(payment.pagamento_valor),
        metodoPagamento: payment.pagamento_metodo,
      }));

      setCarrinho((prevCarrinho) => [...prevCarrinho, ...payments]);
    }
  }, [listOfPayments]);

  const adicionarItem = async () => {
    if (valor && metodoPagamento) {
      let res = await handleCreatePayment();

      const novoItem = {
        id: res.pagamento_id,
        valor: parseFloat(valor),
        metodoPagamento: metodoPagamento,
      };

      setCarrinho((prevCarrinho) => [...prevCarrinho, novoItem]);

      // Limpar os campos após adicionar o item
      setValor('');
      setMetodoPagamento('');
    } else {
      alert('Preencha todos os campos antes de adicionar o item.');
    }
  };

  const removerItem = async (id) => {
    handleDeletePayment(id);
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
  };

  return (
    <div>
      <div>
        <p>Valor:</p>
        <input
          type="text"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <p>Método de Pagamento:</p>
        <select
          type="text"
          value={metodoPagamento}
          onChange={(e) => handleChangePagamento(e.target.value)}
        >
          <option value=""></option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Pix">Pix</option>
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
        </select>
        <button onClick={adicionarItem}>Adicionar</button>
      </div>
      <div>
        {carrinho.length === 0 ? (
          <p>Adicionar Pagamento</p>
        ) : (
          <ul>
            {carrinho.map((item) => (
              <li key={item.id}>
                <p>Valor: R$ {formatValues(item.valor)}</p>
                <p>Método de Pagamento: {item.metodoPagamento}</p>
                <button onClick={() => removerItem(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CarrinhoCompras;
