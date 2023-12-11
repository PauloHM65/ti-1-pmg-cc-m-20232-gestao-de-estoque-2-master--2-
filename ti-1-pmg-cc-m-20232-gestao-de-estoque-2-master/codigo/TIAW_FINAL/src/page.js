
/* -------------------- CARREGA DADOS -------------------------------*/

const UrlProdutos = "https://stocktracker--pauloharaujo345.repl.co/produtos"

function carregaDadosJSONServerPrudutos(func) {
    fetch(UrlProdutos)
        .then(function (response) { return response.json() })
        .then(function (dados) {
            Produtos = dados
            func()
        })
}


const UrlCat = "https://stocktracker--pauloharaujo345.repl.co/categorias"

function carregaDadosJSONServerCat(func) {
    fetch(UrlCat)
        .then(function (response) { return response.json() })
        .then(function (dados) {
            Categorias = dados
            func()
        })

}

/* -------------------- INCLUI E MOSTRA DADOS -------------------------------*/

/*function salvaDados(dados) {

    localStorage.setItem('db', JSON.stringify(dados));
}


function incluirDados() {

    let Produtos = leDados();


    let nome = document.getElementById('camponome').value;
    let peso = document.getElementById('campopeso').value;
    let valor = document.getElementById('campovalor').value;
    let Qtd = document.getElementById('campoqtd').value;
    let MinQtd = document.getElementById('campoMinqtd').value;

    let novoprod = {
        nome: nome,
        peso: peso,
        valor: valor,
        Qtd: Qtd,
        MinQtd: MinQtd,
    };
    Produtos.produtos.push(novoprod);


    salvaDados(Produtos);


    imprimeDados();
}*/

function imprimeDado() {

    let categori = document.querySelector('.categoriaProdutos');
    let nome = document.getElementById('campoNome');
    let peso = document.getElementById('campoPeso');
    let valor = document.getElementById('campoValor');
    let Qtd = document.getElementById('campoQtd');
    let MinQtd = document.getElementById('campoMinQtd');
    let imgid = document.getElementById('campolixeira');
    let srtHTML = '';
    let srtHTMLp = '';
    let srtHTMLv = '';
    let srtHTMLq = '';
    let srtHTMLmq = '';
    let imgg = '';
    let msf = '';

    srtHTML += `<p class="cc" id="c">NOME</p>`
    srtHTMLp += `<p class="cc" id="c">PESO(g)</p>`
    srtHTMLv += `<p class="cc" id="c">VALOR</p>`
    srtHTMLq += `<p class="cc" id="c">Qtd</p>`
    srtHTMLmq += `<p class="cc" id="c">Validadde</p>`
    imgg += `<div class="cx"></div>`

    msf = `<span>${categoria}</span>`
    for (i = 0; i < categorias.length; i++) {
        var anox = categorias[i].ano
        var mesx = categorias[i].mes
        var dataFormatada = `${mesx}/${anox}`
        if (i % 2 != 0) {
            srtHTML += `<p class="cc" id="c">${categorias[i].nome}</p>`
            srtHTMLp += `<p class="cc" id="c">${categorias[i].peso}</p>`
            srtHTMLv += `<p class="cc" id="c">${categorias[i].valor}</p>`
            srtHTMLq += `<p class="cc" id="c">${categorias[i].Qtd}</p>`
            srtHTMLmq += `<p class="cc" id="c">${dataFormatada}</p>`
            imgg += `<div class="cc" id="c"><a id="deletar" onclick="excluirProduto(${categorias[i].id}, '${categorias[i].categoria}')"><img src="files/img/icons8-lixeira-24.png"  height="16"></a></div>`
        } else {
            srtHTML += `<p class="cc" >${categorias[i].nome}</p>`
            srtHTMLp += `<p class="cc" >${categorias[i].peso}</p>`
            srtHTMLv += `<p class="cc" >${categorias[i].valor}</p>`
            srtHTMLq += `<p class="cc" >${categorias[i].Qtd}</p>`
            srtHTMLmq += `<p class="cc" >${dataFormatada}</p>`
            imgg += `<p class="cc"><a id="deletar" onclick="excluirProduto(${categorias[i].id}, '${categorias[i].categoria}')"><img src="files/img/icons8-lixeira-24.png"  height="16"></a></p>`
        }

    }

    nome.innerHTML = srtHTML
    peso.innerHTML = srtHTMLp
    valor.innerHTML = srtHTMLv
    Qtd.innerHTML = srtHTMLq
    MinQtd.innerHTML = srtHTMLmq
    categori.innerHTML = msf
    imgid.innerHTML = imgg

}


/* -------------------- DIRECIONA PAGINA -------------------------------*/
function HOME() {
    window.location.href = "http://127.0.0.1:5501/HOME/home.html";
}
function INVENTARIO() {
    window.location.href = "http://127.0.0.1:5501/tela_categorais/tela_categorias.html";
}

document.getElementById('btncadastar').addEventListener('click', HOME);
document.getElementById('btninventario').addEventListener('click', INVENTARIO);


/* ---------------------- VOLTA A PAGINA ANTIGA  -----------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    // Função para lidar com a mudança de página
    function handlePageChange() {
        // Obtem a URL atual
        var currentPage = window.location.href;

        // Faça algo com a URL atual (por exemplo, imprima no console)
        console.log('Página atual:', currentPage);
    }

    // Adicione um ouvinte de eventos para o evento "popstate" (mudança de histórico)
    window.addEventListener('popstate', handlePageChange);

    // Função para voltar à página anterior
    function goBack() {
        window.history.back();
    }

    // Adicione um ouvinte de eventos para o botão de voltar
    var backButton = document.getElementById('img_retorno');
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
});



//------------------------  EXCLUI O PRODUTO ----------------------------


function excluirProduto(id, categoria) {
    // Exclui o produto
    fetch(`${UrlProdutos}/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao excluir o produto: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Produto excluído com sucesso:', data);

            // Verifica se a categoria ainda possui produtos
            return fetch(`${UrlProdutos}?categoria=${categoria}`);
        })
        .then(response => response.json())
        .then(produtosDaCategoria => {

            console.log(produtosDaCategoria);
            // Se não houver mais produtos na categoria, exclui a categoria
            if (produtosDaCategoria.length === 0 || produtosDaCategoria.length === null) {
                console.log("Categoria não possui mais produtos. Excluindo...");

                // Encontra o ID da categoria e exclui
                return carregaDadosJSONServerCat(deletCat)
                    .then(() => {
                        
                        console.log('Categoria excluída com sucesso');
                        // Recarrega a página após excluir o produto e a categoria, se necessário
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Erro ao excluir categoria:', error);
                        // Se ocorrer um erro ao excluir a categoria, ainda assim, recarrega a página
                        location.reload();
                    });
            } else {
                // Se há produtos na categoria, apenas recarrega a página
                location.reload();
            }
        })
        .catch(error => console.error('Erro ao excluir produto:', error));
}

function deletCat() {

    console.log(Categorias);
    const categoriaObj = Categorias.find(cat => cat.cat == categoria);
    console.log(categoriaObj);
    if (categoriaObj) {
        const categoriaId = categoriaObj.id;

        // Exclui a categoria usando o ID
        return fetch(`${UrlCat}/${categoriaId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

