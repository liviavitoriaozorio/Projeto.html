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
    // Seleciona o botão "Adicionar"
    const addButton = document.querySelector(".box-info .add");

    // Função para mostrar a tela de adicionar
    addButton.addEventListener("click", function () {
        // Cria um overlay que vai cobrir toda a tela
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        // Cria o conteúdo da tela de adicionar
        const addContent = document.createElement("div");
        addContent.classList.add("add-content");
        addContent.innerHTML = `
            <h2> Nova Atividade </h2>
            <p >Preencha os campos abaixo </p>
            <form>
                <select>
                    <option value="projeto">Projeto</option>
                    <option value="avaliação">Avaliação</option>
                    <option value="relatorio">Relatório</option>
                    <option value="revisao">Revisão</option>
                    <option value="apresentacao">Apresentação</option>
                    <option value="questionario">Questionário</option>
                    <option value="leitura">Leitura</option>
                    <option value="pesquisa">Pesquisa</option>
                    <option value="lição">Lição de casa</option>
                    <option value="aviso">Aviso</option>
                </select>

                <label for="anexo">Anexo</label>
                <input type="file" id="fileInput">
                <label for="date">Data:</label>
                <input type="date" id="date" name="date">
                <label for="title">conteudo</label>
                <input type="text" id="text" name="text" placeholder="Digite o texto...">
                <button type="submit">Salvar</button>
            </form>
            <button id="close-btn">Fechar</button>
        `;

        // Adiciona o overlay e o conteúdo ao body
        document.body.appendChild(overlay);
        document.body.appendChild(addContent);

        // Função para fechar a tela
        document.getElementById("close-btn").addEventListener("click", function () {
            document.body.removeChild(overlay);
            document.body.removeChild(addContent);
        });
    });
});



