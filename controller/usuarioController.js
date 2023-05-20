$(document).ready(function () {
  $('#Nome').tooltip({ placement: 'bottom' });

  $("#BtnCadastrar").click(function () {
    let nome = $('#Nome').val();
    let senha = $('#Senha').val();
    let email = $('#Email').val();
    let telefone = $('#Telefone').val();
    let cpf = $('#Cpf').val();
    let rg = $('#Rg').val();

    validaDados(nome)

    let novoUsuario = new Usuario(nome, senha, email, telefone, cpf, rg);
    console.log(novoUsuario);
    novoUsuario.salvar();
  });

  function validaDados(nome) {
    if (nome == "" || nome == null || typeof nome == 'undefined') {
      $('#Nome').addClass('is-invalid');
      return false;
    }
  }
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