// Definindo a tupla para representar um lembrete
type Lembrete = {
  userId: string;
  titulo: string;
  dataInserido: Date;
  dataLimite: Date;
  descricao: string;
};

// Armazenando os lembretes de cada usuário
let lembretes: Record<string, Lembrete[]> = {};

// Função para salvar os lembretes no localStorage
function salvarLembretes(): void {
  const lembretesSalvos = JSON.stringify(lembretes, (key, value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  });
  localStorage.setItem("lembretes", lembretesSalvos);
}

// Função para carregar os lembretes do localStorage
function carregarLembretes(): void {
  const lembretesCarregados = localStorage.getItem("lembretes");
  if (lembretesCarregados) {
    lembretes = JSON.parse(lembretesCarregados, (key, value) => {
      if (key === "dataInserido" || key === "dataLimite") {
        return new Date(value);
      }
      return value;
    });
  }
}

// Função para adicionar um lembrete para um usuário específico
function adicionarLembrete(lembrete: Lembrete): void {
  let usuarioAtual = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Verificando se o usuário está autenticado
  if (!usuarioAtual || !usuarioAtual.usuario) {
    alert("Faça login para adicionar lembretes.");
    // Se o usuário não estiver autenticado, redireciona de volta para a página de login
    window.location.href = "./login.html";
    return;
  }

  // Verificando se o usuário tem uma entrada no objeto de lembretes
  if (!lembretes[usuarioAtual.usuario]) {
    lembretes[usuarioAtual.usuario] = [];
  }

  // Associando o lembrete ao usuário autenticado
  lembrete.userId = usuarioAtual.usuario;

  lembretes[usuarioAtual.usuario].push(lembrete);
  salvarLembretes();
  renderizarListaLembretes();
}

// Função para editar um lembrete de um usuário específico
function editarLembrete(
  userId: string,
  index: number,
  lembrete: Lembrete
): void {
  let lembretesUser = lembretes[userId];
  if (!lembretesUser) {
    alert("Usuário não encontrado ou sem lembretes");
    return;
  }

  lembretesUser[index] = lembrete;
  salvarLembretes();
  renderizarListaLembretes();
}

// Função para excluir um lembrete de um usuário específico
function removerLembrete(userId: string, index: number): void {
  let lembretesUser = lembretes[userId];
  if (!lembretesUser) {
    alert("Usuário não encontrado ou sem lembretes");
    return;
  }

  lembretesUser.splice(index, 1);
  salvarLembretes();
  renderizarListaLembretes();
}

// Adicionando um Event Listener ao botão "Adicionar Lembrete"
let formAdicionarLembretes = document.getElementById(
  "formLembretes"
) as HTMLFormElement;
formAdicionarLembretes?.addEventListener("submit", formAdicionarLembrete);

// Função para realizar a adição dos lembretes do formulário
function formAdicionarLembrete(event: Event): void {
  event.preventDefault();
  let formAdicionarLembrete = event.target as HTMLFormElement;
  let tituloEditado = formAdicionarLembrete.elements.namedItem(
    "titulo"
  ) as HTMLInputElement;
  let dataLimiteEditado = formAdicionarLembrete.elements.namedItem(
    "dataLimite"
  ) as HTMLInputElement;
  let descricaoEditado = formAdicionarLembrete.elements.namedItem(
    "descricao"
  ) as HTMLTextAreaElement;

  let titulo = tituloEditado.value.trim();
  let dataLimite = new Date(dataLimiteEditado.value.trim());
  let descricao = descricaoEditado.value.trim();

  if (titulo && dataLimite && descricao) {
    let usuarioAtual = JSON.parse(localStorage.getItem("currentUser") || "{}");

    if (!usuarioAtual || !usuarioAtual.usuario) {
      alert("Faça login para adicionar lembretes.");
      window.location.href = "./login.html";
      return;
    }

    let lembrete: Lembrete = {
      userId: usuarioAtual.usuario,
      titulo,
      dataInserido: new Date(),
      dataLimite,
      descricao,
    };
    adicionarLembrete(lembrete);

    formAdicionarLembrete.reset();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Função para exibir o formulário de edição preenchido com todas as informações
function mostrarFormEditar(userId: string, index: number): void {
  let usuarioAtual = JSON.parse(localStorage.getItem("currentUser") || "{}");
  let lembretesUser = lembretes[userId];
  if (
    !usuarioAtual ||
    !usuarioAtual.usuario ||
    !lembretesUser ||
    index < 0 ||
    index >= lembretesUser.length
  ) {
    alert("Erro ao editar lembrete.");
    return;
  }

  let lembrete = lembretesUser[index];
  let formEditarLembretes = document.getElementById(
    "formLembretes"
  ) as HTMLFormElement;
  let botaoSubmit = document.getElementById("botaoEnviar") as HTMLButtonElement;
  let tituloInserido = formEditarLembretes.elements.namedItem(
    "titulo"
  ) as HTMLInputElement;
  let dataLimiteInserido = formEditarLembretes.elements.namedItem(
    "dataLimite"
  ) as HTMLInputElement;
  let descricaoInserido = formEditarLembretes.elements.namedItem(
    "descricao"
  ) as HTMLTextAreaElement;

  // Ajustando a hora para o fuso horário local antes de preencher o campo
  let dataLimiteLocal = new Date(
    lembrete.dataLimite.getTime() -
      lembrete.dataLimite.getTimezoneOffset() * 60000
  );
  let dataLimiteFormatada = dataLimiteLocal.toISOString().slice(0, 16);

  // Preenchendo os campos do formulário com os detalhes do lembrete selecionado
  tituloInserido.value = lembrete.titulo;
  dataLimiteInserido.value = dataLimiteFormatada;
  descricaoInserido.value = lembrete.descricao;

  // Alterando o texto do botão para "Salvar"
  botaoSubmit.textContent = "Salvar";

  botaoSubmit.onclick = (e) => {
    e.preventDefault();
    let novoLembrete: Lembrete = {
      userId: lembrete.userId,
      titulo: tituloInserido.value,
      dataInserido: lembrete.dataInserido,
      dataLimite: new Date(dataLimiteInserido.value),
      descricao: descricaoInserido.value,
    };
    editarLembrete(userId, index, novoLembrete);

    formEditarLembretes.reset();

    botaoSubmit.textContent = "Adicionar Lembrete";
    botaoSubmit.onclick = formAdicionarLembrete;
  };
}

// Função para formatar a data e hora no formato dd/MM/yy HH:mm
function formatarDataHora(data: Date): string {
  if (data instanceof Date && !isNaN(data.getTime())) {
    let dia = String(data.getDate()).padStart(2, "0");
    let mes = String(data.getMonth() + 1).padStart(2, "0");
    let ano = String(data.getFullYear()).slice(2);
    let hora = String(data.getHours()).padStart(2, "0");
    let minuto = String(data.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  } else {
    return "Data inválida";
  }
}

// Função para renderizar a lista de lembretes na interface HTML
function renderizarListaLembretes(): void {
  let usuarioAtual = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!usuarioAtual || !usuarioAtual.usuario) {
    window.location.href = "./login.html";
    return;
  }

  const listaLembretes = document.getElementById("listaLembretes");
  if (listaLembretes) {
    // Limpando a lista antes de atualizar
    listaLembretes.innerHTML = "";

    // Verificando se o usuário possui lembretes
    if (lembretes.hasOwnProperty(usuarioAtual.usuario)) {
      const lembretesUser = lembretes[usuarioAtual.usuario];
      lembretesUser.forEach((lembrete, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
          <strong>Título:</strong> ${lembrete.titulo}<br>
          <strong>Data de Inserção:</strong> ${formatarDataHora(
            lembrete.dataInserido
          )}<br>
          <strong>Data Limite:</strong> ${formatarDataHora(
            lembrete.dataLimite
          )}<br>
          <strong>Descrição:</strong> ${lembrete.descricao}<br>
          <button data-user="${
            usuarioAtual.usuario
          }" data-index="${index}" class="botaoEditar">Editar</button>
          <button data-user="${
            usuarioAtual.usuario
          }" data-index="${index}" class="botaoRemover">Excluir</button>
        `;
        listaLembretes.appendChild(li);
      });
    }

    // Adiciona os event listeners para os botões
    listaLembretes.querySelectorAll(".botaoRemover").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", () => {
          let userId = button.dataset.user || "";
          let index = parseInt(button.dataset.index || "0");
          removerLembrete(userId, index);
        });
      }
    });

    listaLembretes.querySelectorAll(".botaoEditar").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", () => {
          let userId = button.dataset.user || "";
          let index = parseInt(button.dataset.index || "0");
          mostrarFormEditar(userId, index);
        });
      }
    });
  }
}

// Função para o logout dos lembretes
function logout(): void {
  // Removendo o usuário atual do localStorage
  localStorage.removeItem("currentUser");
  // Redirecionando para a página de login
  window.location.href = "./login.html";
}

// Adicionando um Event Listener para o botão de logout
const botaoLogout = document.getElementById("botaoLogout");
if (botaoLogout) {
  botaoLogout.addEventListener("click", logout);
}

// Carregando os lembretes ao iniciar a página
carregarLembretes();

// Renderizando a lista de lembretes
renderizarListaLembretes();
