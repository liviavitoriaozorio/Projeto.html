const usuarios = [
    { nome: "Maria",email: "matematica@lagunaschool.com", senha: "profmat123", tipo: "professor", disciplina: "matematica" },
    { nome: "Ana", email: "portugues@lagunaschool.com", senha: "profport123", tipo: "professor", disciplina: "portugues" },
    { nome: "Marcos", email: "aluno1@lagunaschool.com", senha: "aluno123", tipo: "aluno", turma: "turma_a"},
    { nome: "Thiago", email: "aluno2@lagunaschool.com", senha: "aluno123", tipo: "aluno", turma: "turma_b"}
];

document.getElementById("login-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Busca o usuário correspondente com email e senha
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        if (usuario.tipo === "professor") {
            // Salva as informações do professor e a disciplina no LocalStorage
            localStorage.setItem(`professor_${usuario.disciplina}`, JSON.stringify(usuario));
            localStorage.setItem('disciplinaAtual', usuario.disciplina); // Salva a disciplina atual para uso global
            window.location.href = `inicio_professor.html`;
        } else if (usuario.tipo === "aluno") {
            // Salva o aluno e a turma no LocalStorage
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            // Também salva a turma no localStorage separadamente
            localStorage.setItem("selectedTurma", usuario.turma); // Salva a turma do aluno
            window.location.href = "inicio_aluno.html";
        }
    } else {
        // Exibe o prompt de erro com a mensagem
        alert("Credenciais inválidas.");
    }
});
