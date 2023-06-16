function Avaliacao() {

    const dbName = "iLarica";
    const dbVersion = "1.0";
    const dbDisplayName = "iLarica";
    const dbSize = 300 * 1024 * 1024; // 300mb
    const db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);

    let idUsuario = 0;

    this.avaliar = function (valorRating, valorGorjeta) {
        idUsuario = getCookie("idUsuario");

        db.transaction(function (tx) {
            tx.executeSql(
                "INSERT INTO Avaliacoes (idUsuario, nota, dataAvaliacao, gorjeta) VALUES (?, ?, datetime('now'), ?)",
                [idUsuario, valorRating, valorGorjeta],
                function () {
                    console.log("Avaliação inserida com sucesso!");
                    window.location.href = "../../index.html";
                },
                function (error) {
                    console.log("Erro ao inserir avaliação", error);
                }
            );
        });
    }
}