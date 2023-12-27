// Escolher o tipo de projeto
let tipoProjeto;

function votacao() {
    tipoProjeto = document.querySelector("#tipoProjeto").value;
    
    switch (tipoProjeto) {
        case "fotografia":
        case "composicao":
        case "colagem":
        case "interface":
            console.log(`O Projeto selecionado foi ${tipoProjeto}`);
            break;
        case "":
            console.log("Por favor, selecione um tipo de projeto");
            break;
        default:
            alert("Tipo de projeto não reconhecido");
            break;
        }
        
        // Impedir o envio padrão do formulário
        return false;
    }
    const submitForm = document.querySelector('.login-form');

// validação dos nomes de campo e tipo de projeto escolhido
document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector("#nome");
    const button = document.querySelector("#comecarApuracaoBtn");

    // Verifica se os elementos existem antes de adicionar os ouvintes de evento
    if (input && button) {
        const validateInput = ({ target }) => {
            if (target.value.length > 8) {
                button.removeAttribute('disabled');
                return;
            }

            button.setAttribute('disabled', '');
        }
        input.addEventListener('input', validateInput);
    } 
});

//Capturar nome e tipo de projeto
function transferirDados(event) {
    event.preventDefault();
    
    const nomeAluno = document.getElementById("nome").value;
    const tipoProjetoSelecionado = document.getElementById("tipoProjeto").value;

    localStorage.setItem('nomeAluno', nomeAluno);
    localStorage.setItem('tipoProjeto', tipoProjetoSelecionado);
    console.log('Valor do tipoProjeto no localStorage:', tipoProjetoSelecionado);
    
    window.location = "apurar.html";
};

// Variáveis globais para armazenar os dados
const nomeCadastrado = localStorage.getItem('nomeAluno');
const projetoCadastrado = localStorage.getItem('tipoProjeto');
// console.log(typeof nomeCadastrado);
// console.log(typeof projetoCadastrado);

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se os valores existem antes de modificar o HTML
    if (nomeCadastrado && projetoCadastrado) {
        document.getElementById("nomeCadastrado").innerText = nomeCadastrado;
        document.getElementById("projetoCadastrado").innerText = projetoCadastrado;
    } 
});

const resultados = {
    tematica: 0,
    criatividade: 0,
    aspectosTecnicos: 0,
    aspectosDesign: 0,
    totalAvaliadores: 0,
};

const contagemAtrasos = { sim: 0, nao: 0 };

// Função para registrar a avaliação individual
function registrarAvaliacao() {
    // Obter as pontuações do formulário
    let notaIndividualTematica = parseFloat(document.getElementById("tema").value);
    let notaIndividualCriatividade = parseFloat(document.getElementById("criatividade").value);
    let notaIndividualAspectosTecnicos = parseFloat(document.getElementById("tecnica").value);
    let notaIndividualDesign = parseFloat(document.getElementById("design").value);

    // Validar as notas
    if (
        isNaN(notaIndividualTematica) || isNaN(notaIndividualCriatividade) ||
        isNaN(notaIndividualAspectosTecnicos) || isNaN(notaIndividualDesign) ||
        notaIndividualTematica > 5 || notaIndividualCriatividade > 5 ||
        notaIndividualAspectosTecnicos > 5 || notaIndividualDesign > 5
    ) {
        alert("Por favor, insira notas válidas (cada nota deve ser menor ou igual a 5).");
        return;
    }

    // Incrementar os resultados com as pontuações do avaliador atual
    resultados.tematica += notaIndividualTematica;
    resultados.criatividade += notaIndividualCriatividade;
    resultados.aspectosTecnicos += notaIndividualAspectosTecnicos;
    resultados.aspectosDesign += notaIndividualDesign;
    resultados.totalAvaliadores++;

    
    // Inicializa a variável contagemAtrasos
    const selecaoAtraso = document.getElementById('atraso').value;

    if (selecaoAtraso === "sim") {
        contagemAtrasos.sim++;
    } else {
        contagemAtrasos.nao++;
    }

    console.log(resultados);
    console.log(contagemAtrasos);
    document.getElementById("avaliacaoForm").reset();
    
}

// Preparação dos parâmetros de avaliação
const PESOS = {
    interface: {
        tematica: 1.5,
        criatividade: 1,
        aspectosTecnicos: 0.5,
        aspectosDesign: 2,
    },
    fotografia: {
        tematica: 1,
        criatividade: 1.5,
        aspectosTecnicos: 1.5,
        aspectosDesign: 1,
    },
    composicao: {
        tematica: 2,
        criatividade: 2,
        aspectosTecnicos: 0.5,
        aspectosDesign: 0.5,
    },
    colagem: {
        tematica: 2,
        criatividade: 2,
        aspectosTecnicos: 0.5,
        aspectosDesign: 0.5,
    },
};

//Cálculo das médias
let mediaTotalPonderada = 0;

function calcularMediaPonderada(projetoCadastrado) {
    

     // Verificar se o tipo do projeto existe nos pesos
     if (!PESOS.hasOwnProperty(tipoProjetoArmazenado)) {
        alert("Tipo de projeto inválido.");
        return;
    }

    // Calcular a pontuação total ponderada
    let pontuacaoTotalPonderada =
        resultados.tematica * PESOS[tipoProjetoArmazenado].tematica +
        resultados.criatividade * PESOS[tipoProjetoArmazenado].criatividade +
        resultados.aspectosTecnicos * PESOS[tipoProjetoArmazenado].aspectosTecnicos +
        resultados.aspectosDesign * PESOS[tipoProjetoArmazenado].aspectosDesign;

    // Calcular a soma dos pesos
    let somaDosPesos =
        PESOS[tipoProjetoArmazenado].tematica +
        PESOS[tipoProjetoArmazenado].criatividade +
        PESOS[tipoProjetoArmazenado].aspectosTecnicos +
        PESOS[tipoProjetoArmazenado].aspectosDesign;

    // Calcular a média ponderada total
    let mediaTotalPonderada = pontuacaoTotalPonderada / (somaDosPesos * resultados.totalAvaliadores);

    exibirResultadosFinais(mediaTotalPonderada);
    
    // Verificar se há pelo menos um avaliador
    if (resultados.totalAvaliadores === 0) {
        alert("Nenhum avaliador registrou nota ainda.");
        return;
    }
}

function exibirResultadosFinais(mediaTotalPonderada) {
    let resultadosDiv = document.getElementById("resultadosDiv");
    resultadosDiv.innerHTML = `<p><strong>Média Total Ponderada: ${mediaTotalPonderada.toFixed(1)}</strong></p>`;
    resultadosDiv.style.display = "block";
}





// Ação para voltar à página inicial
document.getElementById("botaoVoltarIndex").addEventListener("click", function() {
    window.location.href = "index.html";
});