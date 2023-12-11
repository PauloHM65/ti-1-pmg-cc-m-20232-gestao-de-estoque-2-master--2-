/* ----------------- CARREGAR O BANCO DE DADOS ----------*/

const UrlProdutos = "https://stocktracker--pauloharaujo345.repl.co/produtos"


function carregaDadosJSONServerPrudutos (func) {
    fetch(UrlProdutos)
        .then (function (response) { return response.json() })
        .then (function (dados) {
             Produtos = dados
            func ()
        })
}

/* ----------------- CARREGAR O BANCO DE DADOS ----------*/

const UrlCategorias = "https://stocktracker--pauloharaujo345.repl.co/categorias"


function carregaDadosJSONServerCategorias (func) {
    fetch(UrlCategorias)
        .then (function (response) { return response.json() })
        .then (function (dados) {
             Categorias = dados
            func ()
        })
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
