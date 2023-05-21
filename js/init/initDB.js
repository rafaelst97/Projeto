$(document).ready(function () {
  if (window.openDatabase) {
    const dbName = "iLarica";
    const dbVersion = "1.0";
    const dbDisplayName = "iLarica";
    const dbSize = 300 * 1024 * 1024; // 300mb
    let countCargos = 0;
    let countItens = 0;
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

      //Criar tabela de itens do cardápio
      db.transaction(function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ItensCardapio (nome TEXT," +
          "descricao TEXT," +
          "preco REAL," +
          "imagem TEXT)",
          [],
          function () {
            console.log("Tabela ItensCardapio inicializada com sucesso!");
          },
          function (error) {
            console.log("Erro ao criar tabela: Itens", error);
          }
        );
      });

      //Inserir itens do cardápio caso ainda não tenham sido populados
      db.transaction(function (tx) {
        tx.executeSql('SELECT COUNT(*) FROM ItensCardapio', [], function (tx, result) {
          countItens = result.rows.item(0)['COUNT(*)'];

          console.log(countItens);

          if (countItens == 0) {
            tx.executeSql('INSERT INTO ItensCardapio (nome, descricao, preco, imagem) VALUES ("X-Burguer", "Pão, carne, queijo, alface, tomate e maionese", 10.00, "../../assets/hamburger.jpg"),' +
              '("Batata Frita", "Batata frita com molho especial", 5.00, "../../assets/batata-frita.jpg"),' +
              '("Pizza", "Pizza de calabresa", 20.00, "../../assets/pizza.jpg"),' +
              '("Coca-Cola", "Refrigerante de cola", 5.00, "../../assets/refrigerante.jpg")',
              [],
              function () {
                console.log("Itens inseridos com sucesso!");
              },
              function (error) {
                console.log("Erro ao inserir itens", error);
              }
            );
          }
        }, function (tx, error) {
          console.log('Erro na consulta: ' + error.message);
        });
      });

      //Criar tabela de itens do pedido
      db.transaction(function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ItensPedido (idPedido INTEGER," +
          "idItem INTEGER," +
          "quantidade INTEGER," +
          "FOREIGN KEY(idPedido) REFERENCES Pedidos(rowid)," +
          "FOREIGN KEY(idItem) REFERENCES ItensCardapio(rowid))",
          [],
          function () {
            console.log("Tabela ItensPedido inicializada com sucesso!");
          },
          function (error) {
            console.log("Erro ao criar tabela: ItensPedido", error);
          }
        );
      });

      //Criar tabela de status
      db.transaction(function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Status (nome TEXT)",
          [],
          function () {
            console.log("Tabela Status inicializada com sucesso!");
          },
          function (error) {
            console.log("Erro ao criar tabela: Status", error);
          }
        );
      });

      //Inserir status caso ainda não tenham sido populados
      db.transaction(function (tx) {
        tx.executeSql('SELECT COUNT(*) FROM Status', [], function (tx, result) {
          countStatus = result.rows.item(0)['COUNT(*)'];

          if (countStatus == 0) {
            tx.executeSql('INSERT INTO Status (nome) VALUES ("Aguardando Preparo"), ("Em preparo"), ("Aguardando Entrega"), ("Em entrega"), ("Concluído"), ("Aguardando Retirada"), ("Cancelado")',
              [],
              function () {
                console.log("Status inseridos com sucesso!");
              },
              function (error) {
                console.log("Erro ao inserir status", error);
              }
            );
          }
        }, function (tx, error) {
          console.log('Erro na consulta: ' + error.message);
        });
      });

      //Criar tabela de pedidos
      db.transaction(function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Pedidos (idUsuario INTEGER," +
          "status INTEGER," +
          "formaPagamento TEXT," +
          "FOREIGN KEY(idUsuario) REFERENCES Usuarios(rowid)," +
          "FOREIGN KEY(status) REFERENCES Status(rowid))",
          [],
          function () {
            console.log("Tabela Pedidos inicializada com sucesso!");
          },
          function (error) {
            console.log("Erro ao criar tabela: Pedidos", error);
          }
        );
      });
    });
  } else {
    console.log("Seu navegador não suporta o Web SQL");
  }
})