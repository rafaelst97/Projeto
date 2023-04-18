function transformarEmJson(objeto){
    let retorno = JSON.stringify(objeto);

    return retorno;
}

function salvarEmLocalStorage(json, tabela){
    localStorage.setItem("itensTabela", json);
}

function buscarDeLocalStorage(){
    let retorno = localStorage.getItem("itensTabela");

    return retorno;
}

function transformaJsonEmObjeto(json){
    let retorno = JSON.parse(json);

    return retorno;
}