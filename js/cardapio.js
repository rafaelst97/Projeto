$(document).ready(function () {

  itens = new Array();
  batataFrita = new Item("Batata Frita", 10.00, "../assets/batata-frita.jpg");
  refrigerante = new Item("Refrigerante", 5.00, "../assets/refrigerante.jpg");
  hamburger = new Item("Hamburger", 15.00, "../assets/hamburger.jpg");
  pizza = new Item("Pizza", 20.00, "/assets/pizza.jpg");
  itens = [batataFrita, refrigerante, hamburger, pizza];
  usuario = 6213901;
  var lista = $("#cardapio");

  jsonItens = transformarEmJson(itens);
  jsonUsuario = transformarEmJson(usuario);
  salvarEmLocalStorage(jsonItens, "itensTabela");
  salvarEmLocalStorage(jsonUsuario, "usuarioTabela")

  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    var li = $("<li class='card'>");

    var img = $("<img class='foto-cardapio'>");
    img.attr("src", item.foto);
    img.attr("alt", item.nome);
    li.append(img);

    var div = $("<div>");
    div.addClass("info");
    var h2 = $("<h2>");
    h2.text(item.nome);
    div.append(h2);

    var p = $("<p>");
    p.text("Valor: R$ " + item.valor.toFixed(2));
    div.append(p);

    li.append(div);

    var div2 = $("<div>");
    div2.addClass("botoes-interacao")
    var btnMenos = $("<button class='btn-round'>");
    btnMenos.text("-");
    div2.append(btnMenos);

    var span = $("<span>");
    span.text("0");
    div2.append(span);

    var btnMais = $("<button class='btn-round'>");
    btnMais.text("+");
    div2.append(btnMais);

    li.append(div2);
    lista.append(li);
  }

  var valorTotal = 0;
  var pedidos = [];

  $("#cardapio").on("click", "button", function () {
    var btn = $(this);
    var li = btn.closest("li");
    var qtd = parseInt(li.find("span").text());
    var item = itens[li.index()];
    if (btn.text() === "+") {
      qtd++;
      valorTotal += parseFloat(item.valor);
    } else if (qtd > 0) { // verifica se a quantidade é maior que zero para subtrair
      qtd--;
      valorTotal -= parseFloat(item.valor);
    }
    li.find("span").text(qtd);
    $("#valor-total").text(valorTotal.toFixed(2));
    itens[li.index()].quantidade = qtd; // atualiza a quantidade no array de itens
    salvarItens(itens, usuario, valorTotal, 1); // atualiza o localStorage (armazenamento.js
  });

  $("#btn-confirmar").on("click", function () {
    pedidos = [];
    $("#cardapio li").each(function (index) {
      var qtd = parseInt($(this).find("span").text());
      var item = itens[index];
      if (qtd > 0) {
        pedidos.push({
          nome: item.nome,
          valor: item.valor,
          quantidade: qtd
        });
      }
    });
    if (pedidos.length > 0) { // verifica se existem pedidos para realizar a ação
      salvarEmLocalStorage(jsonUsuario, "logado");
      salvarItens(itens, usuario, valorTotal, 2); // atualiza o localStorage (armazenamento.js)
      window.location.href = "pagamento.html";
    } else {
      alert("Selecione ao menos um item!");
    }
  });
});