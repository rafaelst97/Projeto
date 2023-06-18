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
                        Status.nome AS nomeStatus, 
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
                        LEFT JOIN Usuarios ON Usuarios.rowid = Pedidos.idUsuario 
                        LEFT JOIN Status ON Status.rowid = Pedidos.status`, [], function (tx, results) {
            var len = results.rows.length, i;
            console.log(results);
            for (i = 0; i < len; i++) {
                var item = results.rows.item(i);
                $("#TablePedidosBody").append("<tr><td>" + item.idPedido + "</td><td>" + item.usuarioNome + "</td><td>" + item.nomeStatus + "</td><td>R$" + item.valorTotal.toString().replace('.', ',') + "</td></tr>");
            }
        }, null);
    });

    db.transaction(function (tx) {
        tx.executeSql(`SELECT 
                            Avaliacoes.rowid AS idGorjeta, 
                            Usuarios.nome AS userName, 
                            Avaliacoes.nota AS nota, 
                            Avaliacoes.gorjeta AS valorGorjeta 
                        FROM 
                            Avaliacoes 
                            LEFT JOIN Usuarios ON Usuarios.rowid = Avaliacoes.idUsuario`, [], function (tx, results) {
            var len = results.rows.length, i;
            console.log(results);
            for (i = 0; i < len; i++) {
                var item = results.rows.item(i);
                $("#TableAvaliacoesBody").append("<tr><td>" + item.idGorjeta + "</td><td>" + item.userName + "</td><td>" + item.nota + "</td><td>R$" + item.valorGorjeta.toString().replace('.', ',') + "</td></tr>");
            }
        }, null);
    });

    db.transaction(function (tx) {
        tx.executeSql(`SELECT rowid, nome FROM Status`, [], function (tx, results) {
            var len = results.rows.length, i;
            console.log(results);
            for (i = 0; i < len; i++) {
                var item = results.rows.item(i);
                $("#selectStatus").append("<option value='" + item.rowid + "'>" + item.nome + "</option>");
            }
        }, null);
    });

    $("#BtnRelatorioVendas").click(function () {
        window.location.href = "relatorio-vendas.html";
    });

    $("#BtnRelatorioGorjetas").click(function () {
        window.location.href = "relatorio-gorjeta.html";
    });

    $("#btnAlterarStatus").click(function () {
        var idPedido = $("#inputIdPedido").val();
        var idStatus = $("#selectStatus").val();

        db.transaction(function (tx) {
            tx.executeSql(`UPDATE Pedidos SET status = ? WHERE rowid = ?`, [idStatus, idPedido], function (tx, results) {
                alert("Status alterado com sucesso!");
            }, null);
        });

        location.reload();
    });

});