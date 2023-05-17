$(document).ready(function() {
    $("#BtnCadastrar").click(function() {
      let nome = $('#Nome').val();
      let senha = $('#Senha').val();
      let email = $('#Email').val();
      let telefone = $('#Telefone').val();
      let cpf = $('#Cpf').val();
      let rg = $('#Rg').val();

      let novoUsuario = new Usuario(nome, senha, email, telefone, cpf, rg);
      novoUsuario.salvar();
    });
  });

/*id: PK int
nome: string
senha: string
email: string
telefone: string
cpf: string
rg: string
matricula: int
cargo int */