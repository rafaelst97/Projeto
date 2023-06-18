$(document).ready(function () {

    const dbName = "iLarica";
    const dbVersion = "1.0";
    const dbDisplayName = "iLarica";
    const dbSize = 300 * 1024 * 1024; // 300mb
    const db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);

    db.transaction(function (tx) {
        tx.executeSql(`SELECT 
                            Pedidos.rowid AS idPedido, 
                            Usuarios.nome AS usuarioNome, 
                            (
                            SELECT 
                                SUM(
                                ItensCardapio.preco * ItensPedido.quantidade
                                ) 
                            FROM 
                                ItensPedido 
                                LEFT JOIN ItensCardapio ON ItensCardapio.rowid = ItensPedido.idItem 
                            WHERE 
                                ItensPedido.idPedido = Pedidos.rowid
                            ) AS valorTotal 
                        FROM 
                            Pedidos 
                            LEFT JOIN Usuarios ON Usuarios.rowid = Pedidos.idUsuario`, [], function (tx, results) {
            var len = results.rows.length, i;
            console.log(results);
            for (i = 0; i < len; i++) {
                var item = results.rows.item(i);
                $("#TablePedidosBody").append("<tr><td>" + item.idPedido + "</td><td>" + item.usuarioNome + "</td><td>R$" + item.valorTotal.toString().replace('.', ',') + "</td></tr>");
            }
        }, null);
    });

    $("#BtnRelatorioVendas").click(function () {
        window.location.href = "relatorio-vendas.html";
    });

    $("#BtnRelatorioGorjetas").click(function () {
        window.location.href = "relatorio-gorjetas.html";
    });

});