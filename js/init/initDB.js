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


      //Criar tabela de pedidos
      db.transaction(function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Pedidos (idUsuario INTEGER," +
          "idItem INTEGER," +
          "quantidade INTEGER," +
          "status TEXT," +
          "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id)," +
          "FOREIGN KEY(idItem) REFERENCES Cardapio(id))",
          [],
          function () {
            console.log("Tabela Pedidos inicializada com sucesso!");
          },
          function (error) {
            console.log("Erro ao criar tabela: Pedidos", error);
          }
        );
      });

      //Criar tabela de itens do pedido
      db.transaction(function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ItensPedido (id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "idPedido INTEGER," +
          "idItem INTEGER," +
          "quantidade INTEGER," +
          "FOREIGN KEY(idPedido) REFERENCES Pedidos(id)," +
          "FOREIGN KEY(idItem) REFERENCES Cardapio(id))",
          [],
          function () {
            console.log("Tabela ItensPedido inicializada com sucesso!");
          },
          function (error) {
            console.log("Erro ao criar tabela: ItensPedido", error);
          }
        );
      });

    });
  } else {
    console.log("Seu navegador não suporta o Web SQL");
  }
})