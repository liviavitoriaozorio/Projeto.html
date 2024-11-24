document.addEventListener("DOMContentLoaded", function () {
    const atividades = [
        {
            id: 1,
            nome: "Projeto de Ciências",
            descricao: "Desenvolver um experimento sobre física.",
            prazo: "2024-12-05 23:59",
        },
        {
            id: 2,
            nome: "Redação de Português",
            descricao: "Escrever sobre a importância da leitura.",
            prazo: "2024-12-10 18:00",
        },
    ];

    const atividadesLista = document.getElementById("atividadesLista");

    // Função para formatar o prazo
    function formatarData(data) {
        const date = new Date(data);
        return date.toLocaleString();
    }

    // Função para criar os elementos de atividade
    function criarAtividade(atividade) {
        const atividadeDiv = document.createElement("div");
        atividadeDiv.classList.add("atividade");

        atividadeDiv.innerHTML = `
            <h3>${atividade.nome}</h3>
            <p><strong>Descrição:</strong> ${atividade.descricao}</p>
            <p><strong>Prazo de Entrega:</strong> ${formatarData(atividade.prazo)}</p>
            <div class="botoes-atividade">
                <button class="aceitar" data-id="${atividade.id}">Aceitar</button>
                <button class="negar" data-id="${atividade.id}">Negar</button>
            </div>
            <div class="anexo-container">
                <label for="anexo-${atividade.id}">Anexar Arquivo:</label>
                <input type="file" id="anexo-${atividade.id}" data-id="${atividade.id}" />
            </div>
        `;
        return atividadeDiv;
    }

    // Carregar atividades na página
    function carregarAtividades() {
        atividadesLista.innerHTML = ""; // Limpar a lista antes de recarregar
        atividades.forEach((atividade) => {
            const atividadeElement = criarAtividade(atividade);
            atividadesLista.appendChild(atividadeElement);
        });
    }

    // Lidar com aceitar ou negar atividade
    atividadesLista.addEventListener("click", function (e) {
        const btn = e.target;
        if (btn.classList.contains("aceitar")) {
            const id = btn.dataset.id;
            alert(`Você aceitou a atividade ${id}`);
        } else if (btn.classList.contains("negar")) {
            const id = btn.dataset.id;
            alert(`Você negou a atividade ${id}`);
        }
    });

    // Lidar com anexar arquivo
    atividadesLista.addEventListener("change", function (e) {
        const input = e.target;
        if (input.type === "file") {
            const id = input.dataset.id;
            const arquivo = input.files[0];
            if (arquivo) {
                alert(`Arquivo "${arquivo.name}" anexado à atividade ${id}`);
            }
    // Efeito dos elementos ativos 
const allSideMenu = document.querySelectorAll('#Sidenav .Menu_lateral li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('ativo');
        });
        li.classList.add('ativo');
    });
});



// Esconde o sidenav
const menuBar = document.querySelector('header .fa-solid.fa-bars');
const sidebar = document.getElementById('Sidenav');

menuBar.addEventListener('click', function () {
    // Alterna a classe 'escondido' do sidenav
    sidebar.classList.toggle('escondido');

    // Fecha o submenu se o sidenav estiver escondido
    const submenus = document.querySelectorAll('#Sidenav .Submenu');
    submenus.forEach(submenu => {
        submenu.classList.remove('showCollapse');
    });

    // Também pode resetar a rotação do ícone do submenu
    const arrows = document.querySelectorAll('.fa-chevron-down.rotate');
    arrows.forEach(arrow => {
        arrow.classList.remove('rotate');
    });
});



// Menu das minhas atividades 
const linkCollapse = document.getElementsByClassName('fa-solid fa-chevron-down');

for (let i = 0; i < linkCollapse.length; i++) {
    linkCollapse[i].parentElement.addEventListener('click', function () {
        const collapseMenu = this.nextElementSibling;
        collapseMenu.classList.toggle('showCollapse');

        // Verifica se o sidenav está escondido e, se sim, exibe-o
        if (sidebar.classList.contains('escondido')) {
            sidebar.classList.remove('escondido');
        }

        const rotate = this.querySelector('.fa-chevron-down');
        rotate.classList.toggle('rotate');
    });
}
        }
    });

    carregarAtividades(); // Carregar atividades ao iniciar
});
   // Adiciona o modal e o overlay no corpo da página
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    
        // Fechar o modal
        document.getElementById("close-modal-btn").addEventListener("click", function () {
            document.body.removeChild(overlay);
            document.body.removeChild(modal);
        });
    
        // Fechar o modal clicando fora do conteúdo
        overlay.addEventListener("click", function () {
            document.body.removeChild(overlay);
            document.body.removeChild(modal);
        });
    }
    
    
});
