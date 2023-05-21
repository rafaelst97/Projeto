$(document).ready(function () {

    new Pedido().trazerCardapio();

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


});