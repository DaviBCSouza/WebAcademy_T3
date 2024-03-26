"use strict";
// Processamento do Cadastro (Signup)
const formRegistro = document.getElementById("formCadastro");
formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    let usuarioInserido = document.getElementById("usuario");
    let senhaInserida = document.getElementById("senha");
    let confirmaSenhaInserida = document.getElementById("confirmaSenha");
    let usuario = usuarioInserido.value.trim();
    let senha = senhaInserida.value;
    let confirmaSenha = confirmaSenhaInserida.value;
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem.");
        return;
    }
    // Verificando se o usuário já existe
    let usuarios = JSON.parse(localStorage.getItem("users") || "[]");
    let usuarioExistente = usuarios.some((user) => user.usuario === usuario);
    if (usuarioExistente) {
        alert("Este nome de usuário já está em uso.");
        return;
    }
    // Criando novo usuário
    let novoUsuario = {
        usuario: usuario,
        senha: senha,
    };
    usuarios.push(novoUsuario);
    localStorage.setItem("users", JSON.stringify(usuarios));
    alert("Usuário registrado com sucesso!");
    formRegistro.reset();
    window.location.href = "./login.html";
});
