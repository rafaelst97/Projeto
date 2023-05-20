$(document).ready(function () {
  if (window.openDatabase) {
    const dbName = "iLarica";
    const dbVersion = "1.0";
    const dbDisplayName = "iLarica";
    const dbSize = 300 * 1024 * 1024; // 300mb
    let countCargos = 0;
    let contouCargos = false;

    const db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);

    db.transaction(function (tx) {
      // Criar tabela de usuários
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Usuarios (nome TEXT," +
        "senha TEXT," +
        "email TEXT," +
        "telefone TEXT," +
        "cpf TEXT," +
        "rg TEXT," +
        "matricula INTEGER," +
        "cargo INTEGER)",
        [],
        function () {
          console.log("Tabela Usuarios inicializada com sucesso!");
        },
        function (error) {
          console.log("Erro ao criar tabela: Usuarios", error);
        }
      );
      //Criar tabela de cargos
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Cargos (nome TEXT)",
        [],
        function () {
          console.log("Tabela Cargos inicializada com sucesso!");
        },
        function (error) {
          console.log("Erro ao criar tabela: Cargos", error);
        }
      );

      db.transaction(function (tx) {
        tx.executeSql('SELECT COUNT(*) FROM Cargos', [], function (tx, result) {
          countCargos = result.rows.item(0)['COUNT(*)'];

          //Insere Cargos caso ainda não tenham sido populados
          if (countCargos == 0) {
            tx.executeSql(
              "INSERT INTO Cargos (nome) VALUES ('Atendente'), ('Cozinheiro'), ('Entregador')",
              [],
              function () {
                console.log("Cargos inseridos com sucesso!");
              },
              function (error) {
                console.log("Erro ao inserir cargos", error);
              }
            );
          }
        }, function (tx, error) {
          console.log('Erro na consulta: ' + error.message);
        });
      });

    });
  } else {
    console.log("Seu navegador não suporta o Web SQL");
  }
})