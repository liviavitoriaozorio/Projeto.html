const usuarios = [
    { email: "matematica@lagunaschool.com", senha: "profmat123", tipo: "professor", disciplina: "matematica" },
    { email: "portugues@lagunaschool.com", senha: "profport123", tipo: "professor", disciplina: "portugues" },
    { email: "aluno1@lagunaschool.com", senha: "aluno123", tipo: "aluno", turma: "turma_a"},
    { email: "aluno2@lagunaschool.com", senha: "aluno123", tipo: "aluno", turma: "turma_b"}
];

document.getElementById("login-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Busca o usuário correspondente com email e senha
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        if (usuario.tipo === "professor") {
            // Salva as informações do professor no LocalStorage, incluindo a disciplina
            localStorage.setItem('professor', JSON.stringify(usuario));
            window.location.href = `inicio_professor.html`;
        } else if (usuario.tipo === "aluno") {
            // Redireciona para a página do aluno
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            window.location.href = "inicio_aluno.html";
        }
    } else {
        // Exibe o prompt de erro com a mensagem
        alert("Credenciais inválidas.");
    }
});
