function updateItens(itens) {
    salvarEmLocalStorage(transformarEmJson(itens), "itensTabela"); // atualiza o localStorage
};