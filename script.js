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
        return true;
    }


// Capturar nome e tipo de projeto do aluno avaliado
const submitForm = document.querySelector('.login-form');
const spanNome = document.getElementById('nomeResultado');
const spanTipoProjeto = document.getElementById('tipoProjetoSelecionado');

function transferirDados(event) {
    event.preventDefault();
    
    const nomeAluno = document.getElementById("nome").value;
    const tipoProjetoSelecionado = document.getElementById("tipoProjeto").value;

    localStorage.setItem('nomeAluno', nomeAluno);
    localStorage.setItem('tipoProjeto', tipoProjetoSelecionado);
    window.location = "apurar.html";
};

// submitForm.addEventListener('submit', transferirDados);

document.addEventListener('DOMContentLoaded', function() {
    const nomeArmazenado = localStorage.getItem('nomeAluno');
    const tipoProjetoArmazenado = localStorage.getItem('tipoProjeto');
    alert(`Estudante ${nomeArmazenado} selecionou o projeto ${tipoProjetoArmazenado}`);

    // Verificar se os valores existem antes de exibi-los
    if (nomeArmazenado && tipoProjetoArmazenado) {
        spanNome.innerText = nomeArmazenado;
        spanTipoProjeto.innerText = tipoProjetoArmazenado;
    }
});
