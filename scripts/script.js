// Função que ao iniciar ou atualizar o navegador verifica se existem tarefas armazenadas
// no localStorage e caso existam, exibe as tarefas na tela.
window.onload = function () {
    let dados = localStorage.getItem("arrayTarefas");
    let arrayDados = JSON.parse(dados);

    if (dados != null) {
        if (arrayDados.length != 0) {
            telaRefresh();
        }
    }
}


// Cria um array vazio para armazenar as tarefas
let tarefas = [];


// Função que gera um ID para cada nova tarefa
function geraId() {
    let dataHora = new Date();
    let id = dataHora.getHours().toString() +
        dataHora.getMinutes().toString() +
        dataHora.getSeconds().toString() +
        dataHora.getMilliseconds().toString();
    return id;
}


// Cria uma nova tarefa atravéz da descrição inserida no input
function incluiTarefa() {
    let tarefaDescricao = document.getElementById("textoInput").value;

    // Cria um OBJ tarefa com ID e Descrição
    let tarefa = { id: geraId(), descricao: tarefaDescricao };

    // Adiciona uma nova tarefa no array de tarefas
    tarefas.push(tarefa);

    // Converte o array tarefas em string pelo JSON e grava em localStorage.
    localStorage.setItem("arrayTarefas", JSON.stringify(tarefas));

    // Chama a Função que atualiza a tela
    telaRefresh();

    // Limpa o campo de texto "input" 
    document.getElementById("textoInput").value = "";
    document.getElementById("textoInput").focus();
}


// Função que deleta um elemento da lista de tarefas
// Recebe por parãmetro o elemento <button> que é gerado a cada nova tarefa.
function deletarTarefa(elemento) {

    // for que percorre o array de tarefas criadas. [índice]
    for (let i in tarefas) {

        // Compara o ID do elemento "capturado" com os id's dos elementos do array
        // Quando encontra os mesmos ID's, chama o método splice() e deleta o elemento do array
        if (elemento.id == tarefas[i].id) {
            tarefas.splice(i, 1);
        }

        // Após deletar o OBJ, converte o arrayTarefas em string e grava em localStorage.
        localStorage.setItem("arrayTarefas", JSON.stringify(tarefas));

        // Remove da tela o elemento que foi deletado do array
        elemento.parentElement.remove();
    }
}


// Função que atualiza a tela criando e exibindo a lista com as tarefas gravadas em localStorage
function telaRefresh() {
    // A variável "tarefasStorage" recebe as tarefas (strings) que estão armazenadas em localStorage
    let tarefasStorage = localStorage.getItem("arrayTarefas");

    // converte as strings para Objetos e armazena os OBJs no array "tarefas"
    tarefas = JSON.parse(tarefasStorage);

    // Cria a lista (HTML) que sera exibida na tela. 
    var list = "<ul>";

    for (let t of tarefas) {
        // console.log(tarefas)
        list = list + "<li id-data=" + t.id + "><input id="+"chk"+" type="+"checkbox"+">" + t.descricao +
            "<button class=" + "btnDel" + " onclick=deletarTarefa(this) id= " + t.id + ">Excluir</button>" + "</li>"
    };
    list = list + "</ul>";
    list = list + "<button id=" + "btnApagar" + " onclick=deletarTudo()>Apagar Lista</button>";
    document.getElementById("divLista").innerHTML = list;
}

function deletarTudo() {
    localStorage.clear();
    tarefas = [];
    // document.getElementById("divLista").innerHTML = "";
    location.reload();
}

function validaAdd(){
    let tarefaDescricao = document.getElementById("textoInput").value;
    if (tarefaDescricao != ""){
        incluiTarefa();
    } else{
        alert("Por favor, descreva a tarefa que deseja adicionar!");
    }
}