function Avaliacao() {

    const dbName = "iLarica";
    const dbVersion = "1.0";
    const dbDisplayName = "iLarica";
    const dbSize = 300 * 1024 * 1024; // 300mb
    const db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);

    let idUsuario = 0;

    this.avaliar = function (valorRating) {
        idUsuario = getCookie("idUsuario");

        db.transaction(function (tx) {
            tx.executeSql(
                "INSERT INTO Avaliacoes (idUsuario, nota, dataAvaliacao) VALUES (?, ?, datetime('now'))",
                [idUsuario, valorRating],
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