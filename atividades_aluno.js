// Efeito dos elementos ativos 
const allSideMenu = document.querySelectorAll('#Sidenav .Menu_lateral li a');
const currentPage = window.location.pathname.split('/').pop();

allSideMenu.forEach(item => {
    const li = item.parentElement;
    const href = item.getAttribute('href'); 
    
    li.classList.remove('ativo');

    if (href.includes(currentPage)) {
        li.classList.add('ativo');  
    }

    // Adiciona o efeito de ativação ao clicar
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
    sidebar.classList.toggle('escondido');

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

        if (sidebar.classList.contains('escondido')) {
            sidebar.classList.remove('escondido');
        }

        const rotate = this.querySelector('.fa-chevron-down');
        rotate.classList.toggle('rotate');
    });
}






document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".Menu_lateral .Itens a"); // Seleciona os links do sidenav

    // Recupera a turma do aluno do localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const selectedTurma = usuarioLogado ? usuarioLogado.turma : "turma_a"; // A turma vem do login do aluno

    let disciplinaSelecionada = null; // Variável para a disciplina selecionada no sidenav

    // Verifica se o usuário está logado
    if (!usuarioLogado || !usuarioLogado.turma) {
        alert("Você precisa estar logado para acessar as atividades.");
        window.location.href = "login.html"; // Redireciona para o login se não estiver logado
    }

    // Adiciona eventos para as disciplinas no menu lateral
    menuItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            // Previne o comportamento padrão do link (não recarregar a página)
            event.preventDefault();

            // Captura o ID do elemento clicado (sempre o <a>)
            disciplinaSelecionada = event.currentTarget.id;

            // Carregar as atividades filtradas pela turma e disciplina
            loadActivities(disciplinaSelecionada, selectedTurma);
        });
    });

    // Função para carregar as atividades filtradas pela turma e disciplina
    function loadActivities(disciplina, turma) {
        const activities = JSON.parse(localStorage.getItem(`activities_${disciplina}_${turma}`)) || [];
        const boxInfo = document.querySelector(".box-info");

        // Verifica se há atividades para exibir
        if (activities.length === 0) {
            boxInfo.innerHTML = "<p>Não há atividades para exibir.</p>";
            return;
        }

        // Exibe as atividades na tela
        boxInfo.innerHTML = ""; // Limpa a área antes de adicionar as atividades
        activities.forEach((activity) => {
            const activityElement = createActivityElement(activity);
            boxInfo.appendChild(activityElement);
        });
    }

    // Função para criar o elemento de atividade
    function createActivityElement(details) {
        const { type, date, content, link } = details;
        const typeStyles = {
            Projeto: { icon: "bx bx-task", bgColor: "#CFE8FF", textColor: "#3C91E6" },
            Avaliação: { icon: "bx bx-pencil", bgColor: "#FFF2C6", textColor: "#FFCE26" },
            Relatório: { icon: "bx bx-file", bgColor: "#FFE6E6", textColor: "#FF6F61" },
            Revisão: { icon: "bx bx-book", bgColor: "#E8F5E9", textColor: "#4CAF50" },
            Apresentação: { icon: "bx bx-show", bgColor: "#F3E5F5", textColor: "#9C27B0" },
            Questionário: { icon: "bx bx-help-circle", bgColor: "#FFF9C4", textColor: "#FFC107" },
            Leitura: { icon: "bx bx-book-reader", bgColor: "#D1C4E9", textColor: "#673AB7" },
            Pesquisa: { icon: "bx bx-search", bgColor: "#E1F5FE", textColor: "#03A9F4" },
            "Lição de casa": { icon: "bx bx-home", bgColor: "#FFECB3", textColor: "#FF9800" },
            Aviso: { icon: "bx bx-bell", bgColor: "#FFCDD2", textColor: "#E53935" },
        };
        const { icon, bgColor, textColor } = typeStyles[details.type] || {};

        const activityElement = document.createElement("li");
        activityElement.classList.add("Atividades");
        activityElement.dataset.details = JSON.stringify(details);

        // Mostra inicialmente apenas a data
        activityElement.innerHTML = `        
            <i class="${icon}" style="background: ${bgColor}; color: ${textColor}; padding: 10px; border-radius: 50%;"></i>
            <span>
                <h3>${details.type}</h3>
                <p>${new Date(details.date).toLocaleDateString()}</p>
            </span>
        `;

        // Adiciona evento de clique para mostrar mais detalhes
        activityElement.addEventListener("click", function () {
            showActivityDetails(details);
        });

        return activityElement;
    }

    // Função para exibir os detalhes da atividade
    function showActivityDetails(details) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
    
        const modal = document.createElement("div");
        modal.classList.add("modal");
    
        // Recupera a resposta salva, se existir
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        const email = usuarioLogado ? usuarioLogado.email : null;
        const respostaSalva = email ? localStorage.getItem(`resposta_${details.type}_${email}`) : null;
    
        // Verifica se já existe uma resposta
        const jaRespondeu = !!respostaSalva;
    
        modal.innerHTML = `
            <div class="modal-header">
                <h2>Detalhes da Atividade</h2>
                <button id="close-modal-btn" class="close-btn">X</button>
            </div>
            <div class="modal-body">
                <p><strong>Tipo:</strong> ${details.type}</p>
                <p><strong>Data:</strong> ${details.date}</p>
                <p><strong>Conteúdo/Explicação:</strong> ${details.content}</p>
                ${
                    details.link
                        ? `<p><strong>Link:</strong> <a href="${details.link}" target="_blank">${details.link}</a></p>`
                        : ""
                }
                <div id="resposta-container">
                    ${
                        jaRespondeu
                            ? `<p>Sua resposta: <strong>${respostaSalva}</strong></p>
                               <button id="alterar-resposta-btn">Alterar Resposta</button>`
                            : `<button id="aceitar-btn">Aceitar</button>
                               <button id="negar-btn">Negar</button>`
                    }
                </div>
            </div>
        `;
    
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    
        // Fecha o modal ao clicar no botão de fechar ou no overlay
        document.getElementById("close-modal-btn").addEventListener("click", closeOverlay);
        overlay.addEventListener("click", closeOverlay);
    
        function closeOverlay() {
            document.body.removeChild(overlay);
            document.body.removeChild(modal);
        }
    
        // Adiciona os eventos aos botões
        const respostaContainer = document.getElementById("resposta-container");
    
        if (!jaRespondeu) {
            document.getElementById("aceitar-btn").addEventListener("click", function () {
                salvarResposta("Aceitar");
            });
            document.getElementById("negar-btn").addEventListener("click", function () {
                salvarResposta("Negar");
            });
        } else {
            document.getElementById("alterar-resposta-btn").addEventListener("click", function () {
                respostaContainer.innerHTML = `
                    <button id="aceitar-btn">Aceitar</button>
                    <button id="negar-btn">Negar</button>
                `;
                adicionarEventosBotoes();
            });
        }
    
        function salvarResposta(resposta) {
            if (email) {
                localStorage.setItem(`resposta_${details.type}_${email}`, resposta);
                respostaContainer.innerHTML = `
                    <p>Sua resposta: <strong>${resposta}</strong></p>
                    <button id="alterar-resposta-btn">Alterar Resposta</button>
                `;
                document.getElementById("alterar-resposta-btn").addEventListener("click", function () {
                    respostaContainer.innerHTML = `
                        <button id="aceitar-btn">Aceitar</button>
                        <button id="negar-btn">Negar</button>
                    `;
                    adicionarEventosBotoes();
                });
            } else {
                alert("Erro: usuário não encontrado.");
            }
        }
    
        function adicionarEventosBotoes() {
            document.getElementById("aceitar-btn").addEventListener("click", function () {
                salvarResposta("Aceitar");
            });
            document.getElementById("negar-btn").addEventListener("click", function () {
                salvarResposta("Negar");
            });
        }
    }    
    

    // Inicializa as atividades para a disciplina padrão (nenhuma selecionada inicialmente)
    loadActivities("matematica", selectedTurma); // Padrão inicial
});



document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".bx-plus");
    const todoList = document.querySelector(".todo-list");

    // Carregar lista de tarefas no LocalStorage
    loadTodoList();

    // Ao clicar no botão de adicionar, abrir o formulário
    addButton.addEventListener("click", function () {
        openAddTodoForm();
    });

    // Função para abrir o formulário de nova tarefa ou editar
    function openAddTodoForm(todo = null) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const addContent = document.createElement("div");
        addContent.classList.add("add-content");
        addContent.innerHTML = `
            <h2>${todo ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <form id="todo-form">
                <label for="todo-name">Nome da Tarefa:</label>
                <input type="text" id="todo-name" value="${todo ? todo.content : ''}" required>
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

        // Enviar o formulário
        addContent.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("todo-name").value.trim();

            if (!name) {
                alert("O nome da tarefa é obrigatório.");
                return;
            }

            if (todo) {
                // Atualizar a tarefa existente
                todo.content = name;
                updateTodoItem(todo);
            } else {
                // Adicionar nova tarefa
                const todoItem = createTodoItem(name);
                todoList.appendChild(todoItem);
                saveTodoList();
            }

            // Fechar o modal
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

        // Eventos do menu flutuante
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
        localStorage.setItem("todoList_aluno", JSON.stringify(todos));
    }

    // Carregar a lista do LocalStorage
    function loadTodoList() {
        const savedTodos = JSON.parse(localStorage.getItem("todoList_aluno")) || [];
        savedTodos.forEach(content => {
            const todoItem = createTodoItem(content);
            todoList.appendChild(todoItem);
        });
    }

    // Atualizar a tarefa
    function updateTodoItem(todo) {
        todo.element.querySelector(".todo-content").textContent = todo.content;
        saveTodoList();
    }
});
