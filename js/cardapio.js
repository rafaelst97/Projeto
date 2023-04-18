$(document).ready(function() {

    itens = new Array();
    batataFrita = new Item("Batata Frita", 10.00, "../assets/batata-frita.jpg");
    refrigerante = new Item("Refrigerante", 5.00, "../assets/refrigerante.jpg");
    hamburger = new Item("Hamburger", 15.00, "../assets/hamburger.jpg");
    pizza = new Item("Pizza", 20.00, "/assets/pizza.jpg");
    itens = [batataFrita, refrigerante, hamburger, pizza];
    var lista = $("#cardapio");
    
    jsonItens = transformarEmJson(itens);
    salvarEmLocalStorage(jsonItens, "itensTabela");

    for (var i = 0; i < itens.length; i++) {
        var item = itens[i];
        var li = $("<li>");
    
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
        var btnMenos = $("<button>");
        btnMenos.text("-");
        div2.append(btnMenos);
    
        var span = $("<span>");
        span.text("1");
        div2.append(span);
    
        var btnMais = $("<button>");
        btnMais.text("+");
        div2.append(btnMais);
    
        li.append(div2);
        lista.append(li);
      }

});

var valorTotal = 0;
var pedidos = [];

$("#cardapio").on("click", "button", function() {
  var btn = $(this);
  var li = btn.closest("li");
  var qtd = parseInt(li.find("span").text());
  var item = itens[li.index()];
  if (btn.text() === "+") {
    qtd++;
    valorTotal += item.preco;
  } else {
    qtd--;
    valorTotal -= item.preco;
  }
  li.find("span").text(qtd);
  $("#valor-total").text(valorTotal.toFixed(2));
});

$("#btn-confirmar").on("click", function() {
  pedidos = [];
  $("#cardapio li").each(function(index) {
    var qtd = parseInt($(this).find("span").text());
    var item = itens[index];
    if (qtd > 0) {
      pedidos.push({
        nome: item.nome,
        preco: item.preco,
        quantidade: qtd
      });
    }
  });
  alert("Pedidos: " + JSON.stringify(pedidos) + "\nTotal: R$ " + valorTotal.toFixed(2));
});