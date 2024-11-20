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
const linkCollapse = document.querySelectorAll('fa-solid fa-chevron-down');

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



document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".box-info .add");

    const typeStyles = {
        Projeto: {
            icon: 'bx bx-task',
            bgColor: '#CFE8FF',
            textColor: '#3C91E6'
        },
        Avaliação: {
            icon: 'bx bx-pencil',
            bgColor: '#FFF2C6',
            textColor: '#FFCE26'
        },
        Relatório: {
            icon: 'bx bx-file',
            bgColor: '#FFE6E6',
            textColor: '#FF6F61'
        },
        Revisão: {
            icon: 'bx bx-book',
            bgColor: '#E8F5E9',
            textColor: '#4CAF50'
        },
        Apresentação: {
            icon: 'bx bx-show',
            bgColor: '#F3E5F5',
            textColor: '#9C27B0'
        },
        Questionário: {
            icon: 'bx bx-help-circle',
            bgColor: '#FFF9C4',
            textColor: '#FFC107'
        },
        Leitura: {
            icon: 'bx bx-book-reader',
            bgColor: '#D1C4E9',
            textColor: '#673AB7'
        },
        Pesquisa: {
            icon: 'bx bx-search',
            bgColor: '#E1F5FE',
            textColor: '#03A9F4'
        },
        'Lição de casa': {
            icon: 'bx bx-home',
            bgColor: '#FFECB3',
            textColor: '#FF9800'
        },
        Aviso: {
            icon: 'bx bx-bell',
            bgColor: '#FFCDD2',
            textColor: '#E53935'
        }
    };

    addButton.addEventListener("click", function () {
        openAddActivityForm();
    });

    function openAddActivityForm(activity = null) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const addContent = document.createElement("div");
        addContent.classList.add("add-content");
        addContent.innerHTML = `
            <h2>${activity ? 'Editar Atividade' : 'Nova Atividade'}</h2>
            <p>Preencha os campos abaixo</p>
            <form>
                <label for="type">Tipo:</label>
                <select id="type">
                    <option value="Projeto" ${activity && activity.type === 'Projeto' ? 'selected' : ''}>Projeto</option>
                    <option value="Avaliação" ${activity && activity.type === 'Avaliação' ? 'selected' : ''}>Avaliação</option>
                    <option value="Relatório" ${activity && activity.type === 'Relatório' ? 'selected' : ''}>Relatório</option>
                    <option value="Revisão" ${activity && activity.type === 'Revisão' ? 'selected' : ''}>Revisão</option>
                    <option value="Apresentação" ${activity && activity.type === 'Apresentação' ? 'selected' : ''}>Apresentação</option>
                    <option value="Questionário" ${activity && activity.type === 'Questionário' ? 'selected' : ''}>Questionário</option>
                    <option value="Leitura" ${activity && activity.type === 'Leitura' ? 'selected' : ''}>Leitura</option>
                    <option value="Pesquisa" ${activity && activity.type === 'Pesquisa' ? 'selected' : ''}>Pesquisa</option>
                    <option value="Lição de casa" ${activity && activity.type === 'Lição de casa' ? 'selected' : ''}>Lição de casa</option>
                    <option value="Aviso" ${activity && activity.type === 'Aviso' ? 'selected' : ''}>Aviso</option>
                </select>

                <label for="date">Data:</label>
                <input type="date" id="date" name="date" value="${activity ? activity.date : ''}" required>

                <button type="submit" id="save-btn">${activity ? 'Atualizar' : 'Salvar'}</button>
            </form>
            <button id="close-btn">Fechar</button>
        `;
        document.body.appendChild(overlay);
        document.body.appendChild(addContent);

        document.getElementById("close-btn").addEventListener("click", function () {
            document.body.removeChild(overlay);
            document.body.removeChild(addContent);
        });

        document.getElementById("save-btn").addEventListener("click", function (e) {
            e.preventDefault();

            const type = document.getElementById("type").value;
            const date = document.getElementById("date").value;

            if (!type || !date) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const [year, month, day] = date.split("-");
            const formattedDate = new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long'
            });

            const boxInfo = document.querySelector(".box-info");

            const newActivity = document.createElement("li");
            newActivity.classList.add("Atividades");

            const { icon, bgColor, textColor } = typeStyles[type] || {};

            newActivity.innerHTML = `
                <i class='${icon}' style="background: ${bgColor}; color: ${textColor}; border-radius: 10px; padding: 20px;"></i>
                <span class="text">
                    <h3>${type}</h3>
                    <p>${formattedDate}</p>
                </span>
                <i class="fa-solid fa-ellipsis"></i>
                <div class="menu-flutuante">
                    <a href="#" class="editar">Editar</a>
                    <a href="#" class="deletar">Deletar</a>
                </div>
            `;

            if (activity) {
                boxInfo.replaceChild(newActivity, activity.element);
            } else {
                boxInfo.insertBefore(newActivity, addButton);
            }

            document.body.removeChild(overlay);
            document.body.removeChild(addContent);

            const ellipsisIcon = newActivity.querySelector(".fa-ellipsis");
            const menuFlutuante = newActivity.querySelector(".menu-flutuante");

            ellipsisIcon.addEventListener("click", function () {
                menuFlutuante.style.display = menuFlutuante.style.display === 'block' ? 'none' : 'block';
            });

            const editarButton = menuFlutuante.querySelector(".editar");
            const deletarButton = menuFlutuante.querySelector(".deletar");

            // Função de editar
            editarButton.addEventListener("click", function () {
                openAddActivityForm({
                    type: newActivity.querySelector("h3").textContent,
                    date: newActivity.querySelector("p").textContent,
                    element: newActivity
                });
            });

            // Função de deletar
            deletarButton.addEventListener("click", function () {
                boxInfo.removeChild(newActivity);
            });
        });
    }});

