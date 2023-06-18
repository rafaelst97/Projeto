$(document).ready(function () {

    const dbName = "iLarica";
    const dbVersion = "1.0";
    const dbDisplayName = "iLarica";
    const dbSize = 300 * 1024 * 1024; // 300mb
    const db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);

    // this.trazerRelatorio = function () {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM Pedidos LEFT JOIN ItensPedido ON Pedidos.rowid = ItensPedido.idPedido LEFT JOIN ItensCardapio ON ItensCardapio.rowid = ItensPedido.idItem', [], function (tx, results) {
                var len = results.rows.length, i;
                debugger;
                for (i = 0; i < len; i++) {
                    var item = results.rows.item(i);
                    $("#relatorio").append("<tr><td>" + item.id + "</td><td>" + item.data + "</td><td>" + item.valor + "</td><td>" + item.tipo + "</td></tr>");
                }
            }, null);
        });
    // }

    $("#BtnRelatorioVendas").click(function () {
        window.location.href = "relatorio-vendas.html";
    });

    $("#BtnRelatorioGorjetas").click(function () {
        window.location.href = "/relatorio-gorjetas";
    });

});