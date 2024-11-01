/* Responsavel pelo CSS do "ativo" funcionar  */
const allSideMenu = document.querySelectorAll('#sidenav .menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('ativo');
		})
		li.classList.add('ativo');
	})
});


/* Esconde o sidenav */
const menuBar = document.querySelector('#conteudo nav .fa-solid.fa-bars');
const sidenav = document.getElementById('sidenav');

menuBar.addEventListener('click', function () {
	sidenav.classList.toggle('escondido');
})

const linkCollapse = document.getElementsByClassName('fa-solid fa-chevron-down');
var i

for (let i = 0; i < linkCollapse.length; i++) {
    linkCollapse[i].parentElement.addEventListener('click', function() {
        const collapseMenu = this.nextElementSibling;
        collapseMenu.classList.toggle('showCollapse');

        const rotate = this.querySelector('.fa-chevron-down');
        rotate.classList.toggle('rotate');
    });
}
