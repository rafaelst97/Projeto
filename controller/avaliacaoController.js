$(document).ready(function () {

    let avaliacaoModel = new Avaliacao();

    $('#BtnAvaliar').click(function () {
        var valorRating = $("input[name='rating']:checked").val();
        avaliacaoModel.avaliar(valorRating);
        
    });
});