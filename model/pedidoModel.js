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
                                    `<button type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">` +
                                    `-` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="col-4">` +
                                    `<p id="Quantidade">0</p>` +
                                    `</div>` +
                                    `<div class="col-4">` +
                                    `<button type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">` +
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
                                    `<p class="card-text"><small class="text-muted">R$ ${produto.preco}</small></p>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>`
                                );
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