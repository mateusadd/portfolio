import './ServicoModal.css';
import { useEffect, useState } from 'react';

function ServicoModal({data, isOpen, openModal, createServico, updateServico, deleteServico, clearCard}) {

    const [servicoNome, setServicoNome] = useState('')
    const [servicoPreco, setServicoPreco] = useState('')
    const [servicoComissao, setServicoComissao] = useState('')

    async function handleSaveServico() {

        if (!servicoNome || !servicoPreco || !servicoComissao || servicoNome.trim() === '' || servicoPreco.trim() === '' || servicoComissao.trim() === '') {
            window.alert("Por favor, preencha todos os campos.")
            return;
        } else if (isNaN(servicoPreco) || isNaN(servicoComissao) || !isNaN(servicoNome)) {
            window.alert("Há valores inconsistentes. Por favor, revise as informações.")
            return;
        }

        const servico = {
            servico_id: data.servico_id,
            servico_nome: servicoNome,
            servico_preco: servicoPreco,
            servico_comissao: servicoComissao,
        }

        if(Array.isArray(data)) {
            await createServico(servico)
        } else {
            await updateServico(servico)
        }

        handleCloseModalServico()
    }

    async function handleDeleteServico() {
        if(window.confirm(`Quer mesmo excluir este registro?`)){
            await deleteServico(data.servico_id)
            handleCloseModalServico()
        }
    }

    function handleCloseModalServico() {
        openModal()
        clearCard()
    }

    useEffect(() => {
        if(data) {
            setServicoNome(data.servico_nome)
            setServicoPreco(data.servico_preco)
            setServicoComissao(data.servico_comissao)
        }
    }, [data])

  if(isOpen) {
    return (
        <>
          <div className='servico-background'>
            <div className='servico-modal'>
                <div className='servico-modal-header'>
                    <p>{data && Array.isArray(data) ? 'ADICIONAR SERVIÇO' : `EDITAR SERVIÇO: #${data.servico_id}`}</p>
                </div>
                <div className='servico-modal-text'>
                    <p>Nome: </p>
                    <input type='text' id='servico-nome' name='servico-nome' defaultValue={servicoNome} onChange={(event) => setServicoNome(event.target.value)} />
                </div>
                <div className='servico-modal-text'>
                    <p>Preço (R$): </p>
                    <input type='text' id='servico-preco' name='servico-preco' defaultValue={servicoPreco} onChange={(event) => setServicoPreco(event.target.value)} />
                </div>
                <div className='servico-modal-text'>
                    <p>Comissão (%): </p>
                    <input type='text' id='servico-comissao' name='servico-comissao' defaultValue={servicoComissao} onChange={(event) => setServicoComissao(event.target.value)} />
                </div>
                <div className='servico-modal-footer'>
                    <button onClick={handleSaveServico} className='servico-modal-salvar'>SALVAR</button>
                    <button onClick={handleCloseModalServico} className='servico-modal-fechar'>FECHAR</button>
                    <button onClick={handleDeleteServico} className='servico-modal-delete'>DELETAR</button>
                </div>
            </div>
          </div>
        </>
      );
  }
}

export default ServicoModal;