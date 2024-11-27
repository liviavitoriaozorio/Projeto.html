// Efeito dos elementos ativos 
const allSideMenu = document.querySelectorAll('#Sidenav .Menu_lateral li a');

// Adicionar a classe 'ativo' ao item correspondente à página atual
const currentPage = window.location.pathname.split('/').pop(); // Obtém o nome da página atual

allSideMenu.forEach(item => {
    const li = item.parentElement;
    const href = item.getAttribute('href'); // Obtém o href do link

    // Remover a classe 'ativo' de todos os itens de menu
    li.classList.remove('ativo');

    // Verifica se o href do link corresponde à página atual
    if (href.includes(currentPage)) {
        li.classList.add('ativo');  // Adiciona a classe 'ativo' ao item correspondente
    }

    // Adiciona o efeito de ativação ao clicar
    item.addEventListener('click', function () {
        // Remove a classe 'ativo' de todos os itens de menu
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('ativo');
        });
        // Adiciona a classe 'ativo' ao item clicado
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
        localStorage.setItem("activities_v3", JSON.stringify(activities));
    }

    function loadActivities() {
        const storedActivities = JSON.parse(localStorage.getItem("activities_v3")) || [];
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



document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".bx-plus");
    const todoList = document.querySelector(".todo-list");

    // Carregar todos os itens da lista no LocalStorage
    loadTodoList();

    // Adicionar um novo item ao clicar no botão
    addButton.addEventListener("click", function () {
        openAddTodoForm(); // Chama a função que abre a janela modal
    });

    // Função para abrir a janela modal de adicionar nova tarefa
    function openAddTodoForm(todo = null) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const addContent = document.createElement("div");
        addContent.classList.add("add-content");
        addContent.innerHTML = `
            <h2>${todo ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <form id="todo-form">
                <label for="todo-content">Conteúdo da Tarefa:</label>
                <textarea id="todo-content">${todo ? todo.content : ''}</textarea>
                <button type="submit">${todo ? 'Atualizar' : 'Salvar'}</button>
            </form>
            <button id="close-btn">Fechar</button>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(addContent);

        // Fechar a janela modal
        document.getElementById("close-btn").addEventListener("click", function () {
            overlay.remove();
            addContent.remove();
        });

        // Lidar com o envio do formulário
        addContent.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault();
            const content = document.getElementById("todo-content").value.trim();
            
            if (!content) {
                alert("O conteúdo da tarefa é obrigatório.");
                return;
            }

            if (todo) {
                // Atualizar tarefa existente
                todo.content = content;
                updateTodoItem(todo);
            } else {
                // Adicionar nova tarefa
                const todoItem = createTodoItem(content);
                todoList.appendChild(todoItem);
                saveTodoList();
            }

            // Fechar a janela modal
            overlay.remove();
            addContent.remove();
        });
    }

    // Função para criar um novo item de tarefa
    function createTodoItem(content) {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        li.innerHTML = `
            <span class="todo-content">${content}</span>
            <i class="bx bx-dots-vertical-rounded"></i>
            <div class="menu-flutuante" style="display: none;">
                <a href="#" class="editar">Editar</a>
                <a href="#" class="deletar">Deletar</a>
            </div>
        `;

        // Adicionar eventos de menu flutuante
        const ellipsisIcon = li.querySelector(".bx-dots-vertical-rounded");
        const menuFlutuante = li.querySelector(".menu-flutuante");
        const editButton = li.querySelector(".editar");
        const deleteButton = li.querySelector(".deletar");

        ellipsisIcon.addEventListener("click", function (e) {
            e.stopPropagation();
            menuFlutuante.style.display = menuFlutuante.style.display === "block" ? "none" : "block";
        });

        // Editar tarefa
        editButton.addEventListener("click", function (e) {
            e.stopPropagation();
            openAddTodoForm({ content: li.querySelector(".todo-content").textContent, element: li });
        });

        // Deletar tarefa
        deleteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            li.remove();
            saveTodoList();
        });

        return li;
    }

    // Salvar a lista no LocalStorage
    function saveTodoList() {
        const todos = Array.from(todoList.children).map(item => item.querySelector(".todo-content").textContent);
        localStorage.setItem("todoList_v3", JSON.stringify(todos));
    }

    // Carregar a lista do LocalStorage
    function loadTodoList() {
        const savedTodos = JSON.parse(localStorage.getItem("todoList_v3")) || [];
        savedTodos.forEach(content => {
            const todoItem = createTodoItem(content);
            todoList.appendChild(todoItem);
        });
    }

    // Atualizar tarefa
    function updateTodoItem(todo) {
        todo.element.querySelector(".todo-content").textContent = todo.content;
        saveTodoList();
    }
});
