// Lista de usuários com email, senha, tipo e outras informações
const usuarios = [
    { email: "matematica@lagunaschool.com", senha: "profmat123", tipo: "professor", disciplina: "matematica" },
    { email: "portugues@lagunaschool.com", senha: "profport123", tipo: "professor", disciplina: "portugues" },
    { email: "aluno1@lagunaschool.com", senha: "aluno123", tipo: "aluno" },
    { email: "aluno2@lagunaschool.com", senha: "aluno123", tipo: "aluno" }
];

// Adiciona o ouvinte de evento de clique no botão
document.getElementById("login-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Busca o usuário correspondente com email e senha
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        // Verifica o tipo de usuário e redireciona para a página correta
        if (usuario.tipo === "professor") {
            // Redireciona para a página do professor, passando a disciplina no query string
            window.location.href = `inicio_professor.html?disciplina=${usuario.disciplina}`;
        } else if (usuario.tipo === "aluno") {
            // Redireciona para a página do aluno
            window.location.href = "inicio_aluno.html";
        }
    } else {
        // Exibe o prompt de erro com a mensagem
        alert("Credenciais inválidas.");
    }
});
