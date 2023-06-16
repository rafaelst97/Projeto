$(document).ready(function () {

    $('#gorjeta').mask('000.00', {reverse: true});
    
    let avaliacaoModel = new Avaliacao();

    $('#BtnAvaliar').click(function () {
        var valorRating = $("input[name='rating']:checked").val();
        avaliacaoModel.avaliar(valorRating);
        
    });
});