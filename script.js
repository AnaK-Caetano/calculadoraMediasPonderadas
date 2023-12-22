// Escolher o tipo de projeto
let tipoProjeto;

function votacao() {
    tipoProjeto = document.getElementById("tipoProjeto").value;
    
    switch (tipoProjeto) {
        case "fotografia":
        case "composicao":
        case "colagem":
        case "interface":
            alert(`O Projeto selecionado foi ${tipoProjeto}`);
            break;
        case "":
            alert("Valor inválido");
            break;
        default:
            alert("Tipo de projeto não reconhecido");
            break;
        }
        
        // Impedir o envio padrão do formulário
        return false;
    }


// Capturar nome e tipo de projeto do aluno avaliado
const submitForm = document.querySelector('.login-form');



document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('nome');
    const button = document.getElementById('comecarApuracaoBtn');

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


function transferirDados(event) {
    event.preventDefault();
    
    const nomeAluno = document.getElementById("nome").value;
    const tipoProjetoSelecionado = document.getElementById("tipoProjeto").value;

    localStorage.setItem('nomeAluno', nomeAluno);
    localStorage.setItem('tipoProjeto', tipoProjetoSelecionado);
    window.location = "apurar.html";
};

const spanNome = document.getElementById('nomeResultado');
const spanTipoProjeto = document.getElementById('tipoProjetoSelecionado');

document.addEventListener('DOMContentLoaded', function() {
    const nomeArmazenado = localStorage.getItem('nomeAluno');
    const tipoProjetoArmazenado = localStorage.getItem('tipoProjeto');
    // alert(`Estudante ${nomeArmazenado} selecionou o projeto ${tipoProjetoArmazenado}`);

    // Verificar se os valores existem antes de exibi-los
    if (nomeArmazenado && tipoProjetoArmazenado) {
        spanNome.innerText = nomeArmazenado;
        spanTipoProjeto.innerText = tipoProjetoArmazenado;
    } 
});

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

const tipoProjetoArmazenado = localStorage.getItem('tipoProjeto');

if (PESOS.hasOwnProperty(tipoProjetoArmazenado)) {
    const pesosDoTipoProjeto = PESOS[tipoProjetoArmazenado];

    const pesoTematica = pesosDoTipoProjeto.tematica;
    const pesoCriatividade = pesosDoTipoProjeto.criatividade;
    const pesoAspectosTecnicos = pesosDoTipoProjeto.aspectosTecnicos;
    const pesoAspectosDesign = pesosDoTipoProjeto.aspectosDesign;

    // Use esses pesos conforme necessário na sua lógica
    // alert('Peso Temática:', pesoTematica);
    // alert('Peso Criatividade:', pesoCriatividade);
    // alert('Peso Aspectos Técnicos:', pesoAspectosTecnicos);
    // alert('Peso Aspectos Design:', pesoAspectosDesign);
} else {
    console.error('Tipo de projeto não encontrado em PESOS.');
}