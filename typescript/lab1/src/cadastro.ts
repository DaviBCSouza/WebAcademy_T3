// Definindo a tupla para representar um usuário
type User = {
  usuario: string;
  senha: string;
};

// Processamento do Cadastro (Signup)
const formRegistro = document.getElementById("formCadastro") as HTMLFormElement;

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();

  let usuarioInserido = document.getElementById("usuario") as HTMLInputElement;
  let senhaInserida = document.getElementById("senha") as HTMLInputElement;
  let confirmaSenhaInserida = document.getElementById(
    "confirmaSenha"
  ) as HTMLInputElement;

  let usuario = usuarioInserido.value.trim();
  let senha = senhaInserida.value;
  let confirmaSenha = confirmaSenhaInserida.value;

  if (senha !== confirmaSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  // Verificando se o usuário já existe
  let usuarioExistente: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );
  let usuarios = usuarioExistente.some((user) => user.usuario === usuario);

  if (usuarios) {
    alert("Este nome de usuário já está em uso.");
    return;
  }

  // Criando novo usuário
  let novoUsuario: User = {
    usuario: usuario,
    senha: senha,
  };

  usuarioExistente.push(novoUsuario);
  localStorage.setItem("users", JSON.stringify(usuarioExistente));

  alert("Usuário registrado com sucesso!");

  formRegistro.reset();

  window.location.href = "./login.html";
});
