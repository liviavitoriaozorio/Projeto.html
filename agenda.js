//Quando você clica em um botão para navegar, ela será incrementada ou decrementada.
let semanaAtual = 0;

/* Essa função é chamada sempre que você seleciona um novo mês ou ano
Chama a função renderizarSemanas() para mostrar as semanas deste mês. */
function atualizarCalendario() {
    const mes = parseInt(document.getElementById("mes").value);
    const ano = parseInt(document.getElementById("ano").value);
    
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    
    const diasDoMes = [];
    for (let i = 1; i <= ultimoDia; i++) {
        const dia = new Date(ano, mes, i);
        diasDoMes.push(dia);
    }

    renderizarSemanas(diasDoMes);
}

/* Esta função é responsável por criar e mostrar as semanas
Exibe apenas a semana atual */
function renderizarSemanas(dias) {
    const semanasDiv = document.getElementById("semanas");
    semanasDiv.innerHTML = "";
    
    const semanas = [];
    for (let i = 0; i < dias.length; i += 7) {
        semanas.push(dias.slice(i, i + 7));
    }

    const semanaDiv = document.createElement("div");
    semanaDiv.classList.add("semana");
    
    if (semanaAtual < semanas.length) {
        semanas[semanaAtual].forEach(dia => {
            const diaTexto = document.createElement("div");
            diaTexto.textContent = `${dia.getDate()} ${dia.toLocaleString('pt-BR', { weekday: 'long' })}`;
            semanaDiv.appendChild(diaTexto);
        });
    }
    
    semanasDiv.appendChild(semanaDiv);
}

/* Essa função é chamada quando você clica nas setas para mudar de semana
Verifique se é possível navegar */
function navegarSemana(direcao) {
    const mes = parseInt(document.getElementById("mes").value);
    const ano = parseInt(document.getElementById("ano").value);
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const totalSemanas = Math.ceil(ultimoDia / 7);

    if (semanaAtual + direcao >= 0 && semanaAtual + direcao < totalSemanas) {
        semanaAtual += direcao;
        atualizarCalendario();
    }
}

atualizarCalendario();

document.getElementById('menu').addEventListener('click', function () {
    document.getElementById('sidenav').classList.toggle('fechar-sidenav');
    document.getElementById('conteudo').classList.toggle('expandir-conteudo');
    const element = document.getElementById('setabaixo');
    element.remove();
});
