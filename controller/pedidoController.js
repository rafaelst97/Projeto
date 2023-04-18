function salvarItens(itens, usuario, valorTotal, status) {

    var pedido = {
        usuario: usuario,
        itens: itens,
        valorTotal: valorTotal,
        status: status
    };

    updatePedido(pedido);
}

function atualizaPagamento(tipoPagamento) {

    updateMetodoPagamento(tipoPagamento);

}