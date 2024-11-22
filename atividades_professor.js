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

    // Abre o formulário de nova atividade
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
            <form>
                <label for="type">Tipo:</label>
                <select id="type">
                    ${Object.keys(typeStyles).map(type => `
                        <option value="${type}" ${activity && activity.type === type ? 'selected' : ''}>${type}</option>
                    `).join('')}
                </select>
                <label for="date">Data:</label>
                <input type="date" id="date" value="${activity ? activity.date : ''}" required>
                <label for="content">Conteúdo:</label>
                <textarea id="content">${activity ? activity.content : ''}</textarea>
                <label for="link">Link (opcional):</label>
                <input type="url" id="link" value="${activity ? activity.link : ''}">
                <button type="submit">${activity ? 'Atualizar' : 'Salvar'}</button>
            </form>
            <button id="close-btn">Fechar</button>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(addContent);

        document.getElementById("close-btn").addEventListener("click", function () {
            overlay.remove();
            addContent.remove();
        });

        addContent.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault();
            const type = document.getElementById("type").value;
            const date = document.getElementById("date").value;
            const content = document.getElementById("content").value;
            const link = document.getElementById("link").value;

            if (!type || !date || !content) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }

            const activityDetails = { type, date, content, link };
            if (activity) {
                activityDetails.element = activity.element;
                updateActivity(activityDetails);
            } else {
                addActivity(activityDetails);
            }

            overlay.remove();
            addContent.remove();
        });
    }

    function addActivity(details) {
        const activityElement = createActivityElement(details);
        document.querySelector(".box-info").insertBefore(activityElement, addButton);
        saveActivities();
    }

    function updateActivity(details) {
        const { element, ...newDetails } = details;
        const updatedElement = createActivityElement(newDetails);
        document.querySelector(".box-info").replaceChild(updatedElement, element);
        saveActivities();
    }

    function createActivityElement(details) {
        const { type, date, content, link } = details;
        const { icon, bgColor, textColor } = typeStyles[type] || {};

        const activityElement = document.createElement("li");
        activityElement.classList.add("Atividades");
        activityElement.dataset.details = JSON.stringify(details);

        activityElement.innerHTML = `
            <i class="${icon}" style="background: ${bgColor}; color: ${textColor}; padding: 10px; border-radius: 50%;"></i>
            <span>
                <h3>${type}</h3>
                <p>${new Date(date).toLocaleDateString()}</p>
            </span>
            <i class="fa-solid fa-ellipsis"></i>
            <div class="menu-flutuante">
                <a href="#" class="editar">Editar</a>
                <a href="#" class="deletar">Deletar</a>
            </div>
        `;

        addActivityEventListeners(activityElement);
        return activityElement;
    }

    function addActivityEventListeners(activityElement) {
        const details = JSON.parse(activityElement.dataset.details);

        const editButton = activityElement.querySelector(".editar");
        const deleteButton = activityElement.querySelector(".deletar");

        editButton.addEventListener("click", function (e) {
            e.stopPropagation();
            openAddActivityForm({ ...details, element: activityElement });
        });

        deleteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            activityElement.remove();
            saveActivities();
        });
    }

    function saveActivities() {
        const activities = Array.from(document.querySelectorAll(".Atividades")).map(activityElement =>
            JSON.parse(activityElement.dataset.details)
        );
        localStorage.setItem("activities", JSON.stringify(activities));
    }

    function loadActivities() {
        const storedActivities = JSON.parse(localStorage.getItem("activities")) || [];
        storedActivities.forEach(activity => addActivity(activity));
    }

    loadActivities();

    function addActivityEventListeners(activityElement) {
        const details = JSON.parse(activityElement.dataset.details);
    
        const ellipsisIcon = activityElement.querySelector(".fa-ellipsis");
        const menuFlutuante = activityElement.querySelector(".menu-flutuante");
        const editButton = activityElement.querySelector(".editar");
        const deleteButton = activityElement.querySelector(".deletar");
    
        // Mostrar/ocultar o menu flutuante ao clicar no ícone de três pontos
        ellipsisIcon.addEventListener("click", function (e) {
            e.stopPropagation();  // Impede a propagação do clique, evitando o fechamento imediato do menu
            menuFlutuante.style.display = menuFlutuante.style.display === 'block' ? 'none' : 'block';
        });
    
        // Evita que o menu de edição/exclusão feche imediatamente
        menuFlutuante.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    
        // Evento para editar a atividade
        editButton.addEventListener("click", function (e) {
            e.stopPropagation();
            openAddActivityForm({ ...details, element: activityElement });
        });
    
        // Evento para deletar a atividade
        deleteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            activityElement.remove();
            saveActivities();
        });
    }

    function addActivityEventListeners(activityElement) {
        const details = JSON.parse(activityElement.dataset.details);
    
        // Evento para exibir os detalhes da atividade ao clicar no corpo da atividade
        activityElement.addEventListener("click", function () {
            showActivityDetails(details);
        });
    
        // Eventos do menu flutuante (editar, deletar, etc.)
        const ellipsisIcon = activityElement.querySelector(".fa-ellipsis");
        const menuFlutuante = activityElement.querySelector(".menu-flutuante");
        const editButton = activityElement.querySelector(".editar");
        const deleteButton = activityElement.querySelector(".deletar");
    
        ellipsisIcon.addEventListener("click", function (e) {
            e.stopPropagation();
            menuFlutuante.style.display = menuFlutuante.style.display === 'block' ? 'none' : 'block';
        });
    
        menuFlutuante.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    
        editButton.addEventListener("click", function (e) {
            e.stopPropagation();
            openAddActivityForm({ ...details, element: activityElement });
        });
    
        deleteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            activityElement.remove();
            saveActivities();
        });
    }
    
    function showActivityDetails(details) {
        // Criação do overlay (fundo escuro)
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
    
        // Criação do conteúdo do modal (informações da atividade)
        const modal = document.createElement("div");
        modal.classList.add("modal");
    
        modal.innerHTML = `
            <div class="modal-header">
                <h2>Detalhes da Atividade</h2>
                <button id="close-modal-btn" class="close-btn">X</button>
            </div>
            <div class="modal-body">
                <p><strong>Tipo:</strong> ${details.type}</p>
                <p><strong>Data:</strong> ${details.date}</p>
                <p><strong>Conteúdo/Explicação:</strong> ${details.content}</p>
                ${details.link ? `<p><strong>Link:</strong> <a href="${details.link}" target="_blank">${details.link}</a></p>` : ''}
                ${details.attachment ? `<p><strong>Anexo:</strong> ${details.attachment}</p>` : ''}
            </div>
        `;
    
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
