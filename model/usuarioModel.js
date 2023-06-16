function Usuario(nome, senha, email, telefone, cpf, rg, matricula) {

  //Construtor
  this.nome = nome;
  this.senha = senha;
  this.email = email;
  this.telefone = telefone;
  this.cpf = cpf;
  this.rg = rg;
  this.matricula = matricula;

  //Abre conexão com o banco
  const dbName = "iLarica";
  const dbVersion = "1.0";
  const dbDisplayName = "iLarica";
  const dbSize = 300 * 1024 * 1024; // 300mb
  const db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);

  //Salva usuario na tabela Usuario
  this.salvar = function () {
    let self = this;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Usuarios (nome, senha, email, telefone, cpf, rg, matricula, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [self.nome, self.senha, self.email, self.telefone, self.cpf, self.rg, self.matricula, 0],
        function (tx, result) {
          console.log('Inserção realizada com sucesso em usuários! ID do registro: ' + result.insertId);
        },
        function (tx, error) {
          console.log('Erro ao realizar a inserção em usuários: ' + error.message);
        }
      );
    });
  }

  //Faz Login
  this.login = function (email, senha) {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM Usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        function (tx, result) {
          if (result.rows.length > 0) {
            console.log('Login realizado com sucesso!');
            db.transaction(function (tx) {
              tx.executeSql('SELECT rowid FROM Usuarios WHERE email = ?', [email], function (tx, result) {
                setCookie('idUsuario', result.rows.item(0).rowid, 1);
              });
            });

            db.transaction(function (tx) {
              tx.executeSql('SELECT COUNT(*) FROM Pedidos WHERE idUsuario = ? AND status <> 5 AND status <> 7',
               [getCookie('idUsuario')], function (tx, result) {
                if (result.rows.item(0)['COUNT(*)'] > 0) {
                  console.log('Você possui um pedido em andamento!');
                  window.location.href = '../../view/pedido/rastreio.html';
                }else{
                  window.location.href = '../../view/pedido/pedido.html';
                }
               }, function (tx, error) {
                  console.log('Erro na consulta: ' + error.message);
                });
              });
          } else {
            console.log('Email ou senha incorretos!');
          }
        },
        function (tx, error) {
          console.log('Erro ao realizar o login: ' + error.message);
        }
      );
    });
  }

  //Recuperar senha
  this.esqueciSenha = function (email) {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT senha FROM Usuarios WHERE email = ?',
        [email],
        function (tx, result) {
          if (result.rows.length > 0) {
            alert('Sua senha é: ' + result.rows.item(0).senha);
            window.location.href = "../../index.html";
          } else {
            $('#EmailInvalido').text('Email não cadastrado!');
            $('#EsqueciSenhaEmail').addClass('is-invalid');
          }
        }
      );
    });
  }
}