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

function transferirDados() {
    let nomeAluno = document.getElementsByName('nome')[0].value;

    sessionStorage.setItem('nomeAluno', nomeAluno);
    sessionStorage.setItem('tipoProjeto', tipoProjeto);
}

document.addEventListener('DOMContentLoaded', function () {
    let nomeAluno = sessionStorage.getItem('nomeAluno');
    let resultadoTipoProjeto = sessionStorage.getItem('tipoProjeto');

    // Exibir os valores na segunda página
    document.getElementById('nomeResultado').innerText = nomeAluno;
    document.getElementById('tipoProjetoResultado').innerText = resultadoTipoProjeto;
});