let semanaAtual = 0;

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
