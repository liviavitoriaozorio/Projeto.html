document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegando os valores dos inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificando se os campos não estão vazios (simulação simples de login)
    if (username === "" || password === "") {
        showError("Por favor, preencha todos os campos.");
    } else {
        // Simulação de autenticação simples
        if (username === "usuario" && password === "senha123") {
            alert("Login bem-sucedido!");
            window.location.href = "dashboard.html"; // Redireciona para outra página após o login
        } else {
            showError("Usuário ou senha incorretos.");
        }
    }
});

// Função para mostrar mensagens de erro
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.visibility = 'visible';
}
