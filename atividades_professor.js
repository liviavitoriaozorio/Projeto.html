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
        Projeto: { icon: 'bx bx-task', bgColor: '#CFE8FF', textColor: '#3C91E6' },
        Avaliação: { icon: 'bx bx-pencil', bgColor: '#FFF2C6', textColor: '#FFCE26' },
        Relatório: { icon: 'bx bx-file', bgColor: '#FFE6E6', textColor: '#FF6F61' },
        Revisão: { icon: 'bx bx-book', bgColor: '#E8F5E9', textColor: '#4CAF50' },
        Apresentação: { icon: 'bx bx-show', bgColor: '#F3E5F5', textColor: '#9C27B0' },
        Questionário: { icon: 'bx bx-help-circle', bgColor: '#FFF9C4', textColor: '#FFC107' },
        Leitura: { icon: 'bx bx-book-reader', bgColor: '#D1C4E9', textColor: '#673AB7' },
        Pesquisa: { icon: 'bx bx-search', bgColor: '#E1F5FE', textColor: '#03A9F4' },
        'Lição de casa': { icon: 'bx bx-home', bgColor: '#FFECB3', textColor: '#FF9800' },
        Aviso: { icon: 'bx bx-bell', bgColor: '#FFCDD2', textColor: '#E53935' }
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
                    ${Object.keys(typeStyles).map(type => `
                        <option value="${type}" ${activity && activity.type === type ? 'selected' : ''}>${type}</option>
                    `).join('')}
                </select>

                <label for="date">Data:</label>
                <input type="date" id="date" name="date" value="${activity ? activity.date : ''}" required>

                <label for="content">Conteúdo/Explicação:</label>
                <textarea id="content">${activity ? activity.content : ''}</textarea>

                <label for="link">Link (opcional):</label>
                <input type="url" id="link" value="${activity ? activity.link : ''}">

                <label for="attachment">Anexo:</label>
                <input type="file" id="attachment" ${activity ? 'value="' + activity.attachment + '"' : ''}>

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
            const content = document.getElementById("content").value;
            const link = document.getElementById("link").value;
            const attachment = document.getElementById("attachment").files[0];

            if (!type || !date || !content) {
                alert("Por favor, preencha todos os campos obrigatórios.");
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

            newActivity.dataset.details = JSON.stringify({
                type,
                date: formattedDate,
                content,
                link,
                attachment: attachment ? attachment.name : ''
            });

            if (activity) {
                boxInfo.replaceChild(newActivity, activity.element);
            } else {
                boxInfo.insertBefore(newActivity, addButton);
            }

            document.body.removeChild(overlay);
            document.body.removeChild(addContent);

            newActivity.addEventListener("click", function () {
                const details = JSON.parse(this.dataset.details);
                showDetailsPopup(details);
            });

            const ellipsisIcon = newActivity.querySelector(".fa-ellipsis");
            const menuFlutuante = newActivity.querySelector(".menu-flutuante");

            ellipsisIcon.addEventListener("click", function (e) {
                e.stopPropagation();
                menuFlutuante.style.display = menuFlutuante.style.display === 'block' ? 'none' : 'block';
            });

            const editarButton = menuFlutuante.querySelector(".editar");
            const deletarButton = menuFlutuante.querySelector(".deletar");

            editarButton.addEventListener("click", function (e) {
                e.stopPropagation();
                openAddActivityForm({
                    type,
                    date: formattedDate,
                    content,
                    link,
                    attachment: attachment ? attachment.name : '',
                    element: newActivity
                });
            });

            deletarButton.addEventListener("click", function (e) {
                e.stopPropagation();
                boxInfo.removeChild(newActivity);
                saveActivities(); // Atualiza o localStorage após a exclusão
            });

            saveActivities(); // Salva as atividades no localStorage
        });
    }

    function showDetailsPopup(details) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const detailContent = document.createElement("div");
        detailContent.classList.add("add-content"); // Reutiliza o estilo de "add-content"
        detailContent.innerHTML = `
            <h2>${details.type}</h2>
            <p><strong>Data:</strong> ${details.date}</p>
            <p><strong>Conteúdo:</strong> ${details.content}</p>
            ${details.link ? `<p><strong>Link:</strong> <a href="${details.link}" target="_blank">${details.link}</a></p>` : ''}
            ${details.attachment ? `<p><strong>Anexo:</strong> ${details.attachment}</p>` : ''}
            <button id="close-detail-btn">Fechar</button>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(detailContent);

        document.getElementById("close-detail-btn").addEventListener("click", function () {
            document.body.removeChild(overlay);
            document.body.removeChild(detailContent);
        });
    }

    // Função para salvar as atividades no localStorage
    function saveActivities() {
        const activities = [];
        const activityElements = document.querySelectorAll(".box-info .Atividades");

        activityElements.forEach(activityElement => {
            const details = JSON.parse(activityElement.dataset.details);
            activities.push(details);
        });

        localStorage.setItem("activities", JSON.stringify(activities));
    }

    // Função para carregar as atividades do localStorage
    function loadActivities() {
        const storedActivities = JSON.parse(localStorage.getItem("activities"));
        if (storedActivities) {
            storedActivities.forEach(activity => {
                const newActivity = document.createElement("li");
                newActivity.classList.add("Atividades");

                const { icon, bgColor, textColor } = typeStyles[activity.type] || {};

                newActivity.innerHTML = `
                    <i class='${icon}' style="background: ${bgColor}; color: ${textColor}; border-radius: 10px; padding: 20px;"></i>
                    <span class="text">
                        <h3>${activity.type}</h3>
                        <p>${activity.date}</p>
                    </span>
                    <i class="fa-solid fa-ellipsis"></i>
                    <div class="menu-flutuante">
                        <a href="#" class="editar">Editar</a>
                        <a href="#" class="deletar">Deletar</a>
                    </div>
                `;

                newActivity.dataset.details = JSON.stringify(activity);
                document.querySelector(".box-info").insertBefore(newActivity, addButton);

                // Adicionar funcionalidades de edição e exclusão
                addActivityEventListeners(newActivity);
            });
        }
    }

    // Carregar as atividades armazenadas ao carregar a página
    loadActivities();
});
