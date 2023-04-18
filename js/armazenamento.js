function transformarEmJson(objeto){
    let retorno = JSON.stringify(objeto);

    return retorno;
}

function salvarEmLocalStorage(json, tabela){
    localStorage.setItem(tabela, json);
}

function buscarDeLocalStorage(tabela){
    let retorno = localStorage.getItem(tabela);

    return retorno;
}

function transformaJsonEmObjeto(json){
    let retorno = JSON.parse(json);

    return retorno;
}