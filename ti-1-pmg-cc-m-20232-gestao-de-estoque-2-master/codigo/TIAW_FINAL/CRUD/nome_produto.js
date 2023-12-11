const UrlCat = "https://stocktracker--pauloharaujo345.repl.co/categorias"


const UrlProdutos = "https://stocktracker--pauloharaujo345.repl.co/produtos"



function carregaDadosJSONServerCat(func) {
    fetch(UrlCat)
        .then(function (response) { return response.json() })
        .then(function (dados) {
            Categorias = dados
            func()
        })
}


function carregaDadosJSONServerPrudutos(func) {
    fetch(UrlProdutos)
        .then(function (response) { return response.json() })
        .then(function (dados) {
            Produtos = dados
            func()
        })
}



var mess = document.getElementById("mes");
var anos = document.getElementById("ano");
var produto = document.getElementById("produto");
var quantidade = document.getElementById("quantidade");
var quantidademIN = quantidade * 0.2;
var valor = document.getElementById("valor");
var peso = document.getElementById("peso");
var catego = document.getElementById("catego")


var mensagem = document.getElementById("mensagem")





//-----------------------  Cadastar Produto   -------------------------------------
function confirmarCadastro() {
    //confirma que todos os espaços estao escritos
    if ( produto.value !== "" && quantidade.value !== "" && valor.value !== "" && peso.value !== "" && catego.value !== "") {
        mensagem.innerHTML = `<strong>Produto cadastrado com sucesso</strong><br>Categoria:${catego.value}<br>Nome: ${produto.value}  -  Quantidade: ${quantidade.value} <br>Valor: ${valor.value}  -  Peso: ${peso.value}<br> Ano: ${mess.value}/${anos.value}`;

        carregaDadosJSONServerPrudutos(inserirDadosJsonServer)

    } else {
        mensagem.innerText = "Por favor, preencher antes de confirmar o cadastro.";
    }
}




//----------------------------  Frunçoes administrativas ----------------------------------------

/*const dropdown = document.querySelector(".dropdown");
const select = dropdown.querySelector(".dropdown-select");
const options = dropdown.querySelector(".dropdown-options");

select.addEventListener("click", function () {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

options.querySelectorAll("a").forEach(function (option) {
    option.addEventListener("click", function (e) {
        e.preventDefault();
        select.value = option.textContent;
        options.style.display = "none";
    });
});*/

//---------------------------------------------------------------

function limparCampos() {
    mess.value = "";
    anos.value = "";
    produto.value = "";
    quantidade.value = "";
    valor.value = "";
    peso.value = "";
    catego.value = ""
}

function preencherInput(valor) {
    catego.value = valor;
}



//--------------------------- AJUSTES DATA VALIDADE ------------------------------------

let mes = 1;
let ano = new Date().getFullYear();

function decrementarMes() {
    if (mes > 1) {
        mes--;
        document.getElementById("mes").value = mes;
    }
}

function incrementarMes() {
    if (mes < 12) {
        mes++;
        document.getElementById("mes").value = mes;
    }
}

function decrementarAno() {
    ano--;
    document.getElementById("ano").value = ano;
}

function incrementarAno() {
    ano++;
    document.getElementById("ano").value = ano;
}



/*------------- NAVEGAÇÃO TOGGLE -------------------*/

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



/* ---------------------- pASSA A TELA  -----------------------------*/

function proximoTela() {
    window.location.href = "http://127.0.0.1:5501/tela_categorais/tela_categorias.html";
}


//--------------------------- INCLUI NOVOS DADOS ------------------------- 
function inserirDadosJsonServer() {

    var auxpeso = parseInt(peso.value)
    var auxvalor = parseInt(valor.value)
    var auxqtd = parseInt(quantidade.value)
    var auxprod = produto.value.toString()
    var auxcate = catego.value.toString()
    var auxanoval = parseInt(anos.value)
    var auxmesval = parseInt(mess.value)
    var j = 1
    for (let i = 0; i < Produtos.length; i++) {
        j += i
    }
    j += 1
    boody = {
        "id": j,
        "nome": auxprod,
        "peso": auxpeso,
        "valor": auxvalor,
        "Qtd": auxqtd,
        "ano": auxanoval,
        "mes" : auxmesval,
        "categoria": auxcate
    }
    Ext = Produtos
    ProdCat = UrlProdutos


    
    CRUDPost()
}

function CRUDPost() {
    // Verifica se a categoria já existe em categorias
    fetch(UrlCat)
        .then(response => response.json())
        .then(categorias => {
            const categoriaExistente = categorias.find(c => c.cat === boody.categoria);

            if (!categoriaExistente) {
                // Se a categoria não existe, adiciona-a a categorias
                return fetch(UrlCat, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cat: boody.categoria }),
                });
            }

            // Se a categoria já existe, continua com a próxima etapa
            return Promise.resolve();1
        })
        .then(() => {
            // Adiciona o novo produto a produtos
            return fetch(UrlProdutos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(boody),
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto adicionado com sucesso:', data);
        })
        .catch(error => console.error('Erro ao adicionar produto:', error));
}


function updateTable() {
    // Obter a referência da tabela
    var table = document.getElementById("itemTable");

    // Limpar o corpo da tabela
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    // Preencher a tabela com os itens
    for (var i = 0; i < items.length; i++) {
        var row = tbody.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = i + 1; // ID
        cell2.innerHTML = items[i]; // Item
        cell3.innerHTML = '<button onclick="deleteItem(' + i + ')">Excluir</button>'; // Botão de exclusão
    }
}



//--------------------------------------------------


