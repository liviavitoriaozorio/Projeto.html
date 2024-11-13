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

