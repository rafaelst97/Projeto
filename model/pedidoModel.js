function updatePedido(pedidoNovo) {

    pedidos = transformaJsonEmObjeto(buscarDeLocalStorage("pedidos"));

    if (pedidos === null || pedidos === undefined) {
        pedidos = [];
    }

    if (pedidos.length !== 0) {
        pedidos.forEach(pedido => {
            if (pedido.usuario === pedidoNovo.usuario) {
                pedido.itens = pedidoNovo.itens;
                pedido.valorTotal = pedidoNovo.valorTotal;
                pedido.status = pedidoNovo.status;
            }else{
                pedidos.push(pedidoNovo);
            }
            
        });
    }else{
        pedidos.push(pedidoNovo);
    }

    salvarEmLocalStorage(transformarEmJson(pedidos), "pedidos"); // atualiza o localStorage
};

function updateMetodoPagamento(pagamento){
    let usuario = transformaJsonEmObjeto(buscarDeLocalStorage("logado"));
    let metodoPagamento = pagamento;

    let pedidos = transformaJsonEmObjeto(buscarDeLocalStorage("pedidos"));

    if (pedidos === null || pedidos === undefined) {
        pedidos = [];
    }

    if (pedidos.length !== 0) {
        pedidos.forEach(pedido => {
            if (pedido.usuario === usuario) {
                pedido.metodoPagamento = metodoPagamento;
            }
        });
    }

    salvarEmLocalStorage(transformarEmJson(pedidos), "pedidos"); // atualiza o localStorage

    if(pagamento == 1){
        window.location.href = "tela-pix.html";
    }else if(pagamento == 2){
        window.location.href = "tela-cartao.html";
    }
}