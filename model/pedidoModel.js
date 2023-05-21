function Pedido() {

  const dbName = "iLarica";
  const dbVersion = "1.0";
  const dbDisplayName = "iLarica";
  const dbSize = 300 * 1024 * 1024; // 300mb
  const db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);

  this.trazerCardapio = function () {

    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM ItensCardapio',
        [],
        function (tx, result) {
          console.log(result.rows.length);
          if (result.rows.length > 0) {
            let id = 1
            console.log(result.rows)
            console.log('Cardápio encontrado!');
            Array.from(result.rows).forEach(produto => {
              $('#ListaCardapio').append(
                `<div class="card mb-3" style="max-width: 540px;">` +
                `<div class="row g-0">` +
                `<div class="col-4">` +
                `<img src="${produto.imagem}" class="img-fluid rounded-start" alt="${produto.nome}">` +
                `<div class="container">` +
                `<div class="row mt-4">` +
                `<div class="col-4">` +
                `<button type="button" class="btn btn-primary SubItem" data-id="${id}" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">` +
                `-` +
                `</button>` +
                `</div>` +
                `<div class="col-4">` +
                `<p class="Quantidade" data-id="${id}">0</p>` +
                `</div>` +
                `<div class="col-4">` +
                `<button type="button" class="btn btn-primary AddItem" data-id="${id}" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">` +
                `+` +
                `</button>` +
                `</div>` +
                `</div>` +
                `</div>` +
                `</div>` +
                `<div class="col-8">` +
                `<div class="card-body">` +
                `<h5 class="card-title">${produto.nome}</h5>` +
                `<p class="card-text">${produto.descricao}</p>` +
                `<p class="card-text"><small class="text-muted"><strong>R$ ${produto.preco.toFixed(2).replace('.', ',')}  </strong><img src="../../assets/price.png" height="18vh" alt="[etiqueta]"></small></p>` +
                `</div>` +
                `</div>` +
                `</div>` +
                `</div>`
              );
              id++;
            });
          } else {
            console.log('Cardápio não encontrado!');
          }
        },
        function (tx, error) {
          console.log('Erro ao realizar a busca no cardápio: ' + error.message);
        }
      );
    });
  }

  this.prosseguirPedido = function (itens) {

    let usuarioId = getCookie('idUsuario');
    console.log(usuarioId);

    if (usuarioId) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO Pedidos (idUsuario, status) VALUES (?, ?)',
          [usuarioId, 1],
          function (tx, result) {
            console.log('Pedido cadastrado com sucesso!');
            let pedidoId = result.insertId;
            console.log(pedidoId);
            itens.forEach(item => {
              tx.executeSql(
                'INSERT INTO ItensPedido (idPedido, idItem, quantidade) VALUES (?, ?, ?)',
                [pedidoId, item.id, item.quantidade],
                function (tx, result) {
                  console.log('Item cadastrado com sucesso!');
                  window.location.href = 'pagamento.html';
                },
                function (tx, error) {
                  console.log('Erro ao cadastrar item: ' + error.message);
                }
              );
            });
          }
        );
      });
    } else {
      console.log('Usuário não logado!');
    }
  }

  this.pagarPedido = async function(idPagamento) {
    let idUsuario = getCookie('idUsuario');
    try {
      let idPedido = await this.pedidoPorUsuario(idUsuario);
      db.transaction(function (tx) {
        tx.executeSql(
          `UPDATE Pedidos SET formaPagamento = ${idPagamento} WHERE rowid = ?`,
          [idPedido],
          function (tx, result) {
            console.log('Pedido pago com sucesso!');
            // window.location.href = 'pedidos.html';
          },
          function (tx, error) {
            console.log('Erro ao pagar pedido: ' + error.message);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  this.cancelarPedido = function(idPedido) {
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE Pedidos SET status = 7 WHERE rowid = ?',
        [idPedido],
        function (tx, result) {
          console.log('Pedido cancelado com sucesso!');
          window.location.href = '../../index.html';
        },
        function (tx, error) {
          console.log('Erro ao cancelar pedido: ' + error.message);
        }
      );
    });
  }

  this.pedidoPorUsuario = function (idUsuario) {
    return new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
        tx.executeSql(
          'SELECT rowid FROM Pedidos WHERE idUsuario = ? AND status <> 7 AND status <> 5',
          [idUsuario],
          function (tx, result) {
            if (result.rows.length > 0) {
              let pedidoId = result.rows[0].rowid;
              resolve(pedidoId);
            } else {
              reject(new Error('Pedido não encontrado!'));
            }
          },
          function (tx, error) {
            reject(new Error('Erro ao buscar pedido: ' + error.message));
          }
        );
      });
    });
  }

}

/*
<div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-4">
            <img src="../../assets/hamburger.jpg" class="img-fluid rounded-start" alt="...">
            <div class="container">
              <div class="row mt-4">
                <div class="col-4">

                  <button type="button" class="btn btn-primary"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                    -
                  </button>
                </div>
                <div class="col-4">
                  <p>10</p>

                </div>
                <div class="col-4">
                  <button type="button" class="btn btn-primary"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">Hambúrger</h5>
              <p class="card-text">Pão, hambúrguer, alface
                tomate, queijo</p>
              <p class="card-text"><small class="text-muted"><strong>R$35,00 </strong><img src="../../assets/price.png"
                    height="18vh" alt="[etiqueta]"></small></p>
            </div>
          </div>
        </div>
      </div>
*/