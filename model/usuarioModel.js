function Usuario(nome, senha, email, telefone, cpf, rg){
    
    //Construtor
    this.nome = nome;
    this.senha = senha;
    this.email = email;
    this.telefone = telefone;
    this.cpf = cpf;
    this.rg = rg;

    //Salva usuario na tabela Usuario
    this.salvar = function(){
        db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO Usuarios (nome, senha, email, telefone, cpf, rg, matricula, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [this.nome, this.senha, this.email, this.telefone, this.cpf, this.rg, null, null],
              function(tx, result) {
                console.log('Inserção realizada com sucesso em usuários! ID do registro: ' + result.insertId);
              },
              function(tx, error) {
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