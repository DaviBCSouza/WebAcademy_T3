"use strict";
// Processamento do Login
const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    let usuarioInserido = document.getElementById("usuario");
    let senhaInserida = document.getElementById("senha");
    let usuario = usuarioInserido.value.trim();
    let senha = senhaInserida.value;
    // Verificando se o usuário existe
    let usuarioExistente = JSON.parse(localStorage.getItem("users") || "[]");
    let usuario_ = usuarioExistente.find((user) => user.usuario === usuario);
    if (!usuario_ || usuario_.senha !== senha) {
        alert("Credenciais inválidas.");
        return;
    }
    // Autenticando usuário
    localStorage.setItem("currentUser", JSON.stringify(usuario_));
    alert("Login bem-sucedido!");
    let usuarioAtual = JSON.parse(localStorage.getItem("currentUser") || "{}");
    console.log("Usuário após o login:", usuarioAtual);
    formLogin.reset();
    window.location.href = "./lembretes.html";
});
