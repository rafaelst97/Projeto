$(document).ready(function () {
    let pedidoModel = new Pedido();
    pedidoModel.trazerCardapio();
    pedidoModel.rastrear();

    // Evento de clique para adicionar um item
    $(document).on('click', '.AddItem', function () {
        var itemId = $(this).data('id');
        var quantidadeElement = $(`#ListaCardapio .Quantidade[data-id="${itemId}"]`);
        var quantidade = parseInt(quantidadeElement.text()) || 0;
        quantidade++;
        quantidadeElement.text(quantidade);
    });

    // Evento de clique para subtrair um item
    $(document).on('click', '.SubItem', function () {
        var itemId = $(this).data('id');
        var quantidadeElement = $(`#ListaCardapio .Quantidade[data-id="${itemId}"]`);
        var quantidade = parseInt(quantidadeElement.text()) || 0;
        if (quantidade > 0) {
            quantidade--;
            quantidadeElement.text(quantidade);
        }
    });

    //Prosseguir com o pedido
    $('#BtnProsseguir').click(function () {

        var itens = [];

        $('#ListaCardapio .Quantidade').each(function () {
            var quantidade = parseInt($(this).text());
            if (quantidade > 0) {
                var itemId = $(this).data('id');
                itens.push({
                    id: itemId,
                    quantidade: quantidade
                });
            }
        });

        if (itens.length > 0) {
            pedidoModel.prosseguirPedido(itens);
        } else {
            alert('Selecione pelo menos um item!');
        }

    });

    //Pagamentos
    $('#BtnPix').click(function () {
        pedidoModel.pagarPedido(1);
    });

    $('#BtnCartao').click(function () {
        pedidoModel.pagarPedido(2);
    });

    $('#BtnCancelar').click(function () {
        pedidoModel.cancelarPedido();
    });

    //Confirma Entrega e vai para avaliação
    $('#BtnConfirmaEntrega').click(function () {
        pedidoModel.confirmaEntrega(getCookie('idUsuario'));
    });
});