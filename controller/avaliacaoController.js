$(document).ready(function () {

    $('#gorjeta').mask('000.00', {reverse: true});
    
    let avaliacaoModel = new Avaliacao();

    $('#BtnAvaliar').click(function () {
        var valorRating = $("input[name='rating']:checked").val();
        var valorGorjeta = $('#gorjeta').val(); // Obtém o valor do input de gorjeta
        avaliacaoModel.avaliar(valorRating,valorGorjeta);
        
    });
});