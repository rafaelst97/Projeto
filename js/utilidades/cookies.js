// Função para definir um cookie
function setCookie(nome, valor, expiracao) {
    var dataExpiracao = "";

    if (expiracao) {
        var data = new Date();
        data.setTime(data.getTime() + (expiracao * 24 * 60 * 60 * 1000));
        dataExpiracao = "; expires=" + data.toUTCString();
    }

    document.cookie = nome + "=" + valor + dataExpiracao + "; path=/";
}

// Função para recuperar um cookie
function getCookie(nome) {

    var nomeCookie = nome + "=";
    var listaCookies = document.cookie.split(';');

    for (var i = 0; i < listaCookies.length; i++) {
        var cookie = listaCookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(nomeCookie) == 0) {
            return cookie.substring(nomeCookie.length, cookie.length);
        }
    }

    return null;
}