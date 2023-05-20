function Usuario(nome, senha, email, telefone, cpf, rg) {

  //Construtor
  this.nome = nome;
  this.senha = senha;
  this.email = email;
  this.telefone = telefone;
  this.cpf = cpf;
  this.rg = rg;

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
        [self.nome, self.senha, self.email, self.telefone, self.cpf, self.rg, null, null],
        function (tx, result) {
          console.log('Inserção realizada com sucesso em usuários! ID do registro: ' + result.insertId);
        },
        function (tx, error) {
          console.log('Erro ao realizar a inserção em usuários: ' + error.message);
        }
      );
    });
  }

  /*id: PK int
  nome: string
  senha: string
  email: string
  telefone: string
  cpf: string
  rg: string
  matricula: int
  cargo int*/
}