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

    let selectedTurma = localStorage.getItem("selectedTurma") || 'turma_a';

    // Identificando a turma selecionada
    const turmaLinks = document.querySelectorAll("#Sidenav .Submenu .Itens a");
    turmaLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            selectedTurma = this.id; 
            localStorage.setItem("selectedTurma", selectedTurma);
            window.location.href = this.href;
        });
    });

    // Abre o formulário de nova atividade
    addButton.addEventListener("click", function () {
        openAddActivityForm();
    });

    // Função para abrir o formulário de nova atividade
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
            const content = document.getElementById("content").value;
            const link = document.getElementById("link").value;
            const dateInput = document.getElementById("date").value;
            const date = new Date(dateInput); 
        
            date.setDate(date.getDate() + 1);  // Ajuste manual de +1 dia
            const formattedDate = date.toISOString().split('T')[0]; 
        
            if (!type || !date || !content) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }
        
            const activityDetails = { type, date: formattedDate, content, link };
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

    // Função para criar a atividade
    function addActivity(details) {
        const activityElement = createActivityElement(details);
        document.querySelector(".box-info").insertBefore(activityElement, addButton);
        saveActivities();
    }

    // Função para atualizar a atividade
    function updateActivity(details) {
        const { element, ...newDetails } = details;
        const updatedElement = createActivityElement(newDetails);
        document.querySelector(".box-info").replaceChild(updatedElement, element);
        saveActivities();
    }

    // Função para criar o elemento da atividade
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
        const ellipsisButton = activityElement.querySelector(".fa-ellipsis");
        const menuFlutuante = activityElement.querySelector(".menu-flutuante");

        // Mostrar o menu flutuante
        ellipsisButton.addEventListener("click", function (e) {
            e.stopPropagation(); // Impede que o evento se propague para outros elementos
            menuFlutuante.classList.toggle("show"); // Toggle para mostrar/ocultar o menu
        });

        // Editar a atividade
        editButton.addEventListener("click", function (e) {
            e.stopPropagation();
            openAddActivityForm({ ...details, element: activityElement });
        });

        // Deletar a atividade
        deleteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            if (confirm('Tem certeza de que deseja excluir esta atividade?')) {
                activityElement.remove();
                saveActivities();
            }
        });

        // Visualizar detalhes ao clicar na atividade
        activityElement.addEventListener("click", function () {
            viewActivityDetails(details); // Chamando a função para exibir detalhes
        });

        // Fechar o menu quando clicar fora dele
        document.addEventListener("click", function (e) {
            if (!activityElement.contains(e.target)) {
                menuFlutuante.classList.remove("show");
            }
        });
    }

    // Função para visualizar os detalhes da atividade
    function viewActivityDetails(details) {
        // Criar o overlay para os detalhes
        const detailsOverlay = document.createElement("div");
        detailsOverlay.classList.add("details-overlay");

        const detailsContent = document.createElement("div");
        detailsContent.classList.add("details-content");
        detailsContent.innerHTML = `
            <h2>Detalhes da Atividade</h2>
            <p><strong>Tipo:</strong> ${details.type}</p>
            <p><strong>Data:</strong> ${new Date(details.date).toLocaleDateString()}</p>
            <p><strong>Conteúdo:</strong> ${details.content}</p>
            <p><strong>Link:</strong> <a href="${details.link}" target="_blank">${details.link}</a></p>
            <button id="close-details-btn">Fechar</button>
        `;

        document.body.appendChild(detailsOverlay);
        document.body.appendChild(detailsContent);

        // Fechar os detalhes
        document.getElementById("close-details-btn").addEventListener("click", function () {
            detailsOverlay.remove();
            detailsContent.remove();
        });
    }

    // Função para salvar as atividades no localStorage
    function saveActivities() {
        const activities = Array.from(document.querySelectorAll(".Atividades")).map(activityElement =>
            JSON.parse(activityElement.dataset.details)
        );
        localStorage.setItem(`activities_${selectedTurma}`, JSON.stringify(activities));
    }

    // Função para carregar as atividades do localStorage
    function loadActivities() {
        const storedActivities = JSON.parse(localStorage.getItem(`activities_${selectedTurma}`)) || [];
        storedActivities.forEach(activity => addActivity(activity));
    }

    loadActivities();
});


document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".bx-plus");
    const todoList = document.querySelector(".todo-list");

    // Carregar a turma selecionada do localStorage ou usar 'turma_a' como padrão
    let selectedTurma = localStorage.getItem("selectedTurma") || 'turma_a';

    // Carregar todos os itens da lista no LocalStorage para a turma selecionada
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

    // Salvar a lista no LocalStorage, usando a turma selecionada
    function saveTodoList() {
        const todos = Array.from(todoList.children).map(item => item.querySelector(".todo-content").textContent);
        localStorage.setItem(`todoList_${selectedTurma}`, JSON.stringify(todos));
    }

    // Carregar a lista do LocalStorage para a turma selecionada
    function loadTodoList() {
        const savedTodos = JSON.parse(localStorage.getItem(`todoList_${selectedTurma}`)) || [];
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

    // Atualizar a turma selecionada quando mudar a turma
    const turmaLinks = document.querySelectorAll("#Sidenav .Submenu .Itens a");
    turmaLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            selectedTurma = this.id;
            localStorage.setItem("selectedTurma", selectedTurma);
            loadTodoList(); // Recarregar a lista para a nova turma
            window.location.href = this.href;
        });
    });
});
