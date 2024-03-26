// Classe Aluno
class Aluno {
  id: string;
  nome: string;
  idade: number;
  altura: number;
  peso: number;
  genero: string;
  aptFisica: number;
  freqCardiaca: number;

  // Propriedades
  constructor(
    id: string,
    nome: string,
    idade: number,
    altura: number,
    peso: number,
    genero: string,
    aptFisica: number,
    freqCardiaca: number
  ) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.altura = altura;
    this.peso = peso;
    this.genero = genero;
    this.aptFisica = aptFisica;
    this.freqCardiaca = freqCardiaca;
  }
}

// Classe Turma
class Turma {
  id: string;
  nome: string;
  alunos: Aluno[];

  // Propriedades
  constructor(id: string, nome: string) {
    this.id = id;
    this.nome = nome;
    this.alunos = [];
  }

  // Método para adicionar um aluno à turma
  adicionarAluno(aluno: Aluno) {
    this.alunos.push(aluno);
    this.atualizarEstatisticas();
  }

  // Método para atualizar as estatísticas da turma
  atualizarEstatisticas() {
    let numAlunos = this.getNumAlunos();

    // Verificando se há alunos na turma
    if (numAlunos === 0) {
      // Se não houver alunos, definir as estatísticas como 0 ou deixá-las em branco
      document.getElementById("numeroAlunos")!.innerText = "0";
      document.getElementById("mediaIdade")!.innerText = "";
      document.getElementById("generoMaisComum")!.innerText = "";
      document.getElementById("mediaAltura")!.innerText = "";
      document.getElementById("mediaPeso")!.innerText = "";
      document.getElementById("mediaAptFisica")!.innerText = "";
      document.getElementById("mediaFreqCardiaca")!.innerText = "";
      return;
    }

    let mediaIdades = this.getMedia(this.alunos.map((aluno) => aluno.idade));
    let generoMaisComum = this.getGeneroMaisComum();
    let mediaAlturas = this.getMedia(this.alunos.map((aluno) => aluno.altura));
    let mediaPesos = this.getMedia(this.alunos.map((aluno) => aluno.peso));
    let mediaAptFisica = this.getMedia(
      this.alunos.map((aluno) => aluno.aptFisica)
    );
    let mediaFreqCardiaca = this.getMedia(
      this.alunos.map((aluno) => aluno.freqCardiaca)
    );

    document.getElementById("numeroAlunos")!.innerText = numAlunos.toString();
    document.getElementById("mediaIdade")!.innerText = mediaIdades.toFixed(2);
    document.getElementById("generoMaisComum")!.innerText = generoMaisComum;
    document.getElementById("mediaAltura")!.innerText = `${mediaAlturas.toFixed(
      2
    )}m`;
    document.getElementById("mediaPeso")!.innerText = `${mediaPesos.toFixed(
      2
    )}kg`;
    document.getElementById("mediaAptFisica")!.innerText =
      mediaAptFisica.toFixed(2);
    document.getElementById(
      "mediaFreqCardiaca"
    )!.innerText = `${mediaFreqCardiaca.toFixed(2)}bpm`;
  }

  getNumAlunos(): number {
    return this.alunos.length;
  }

  getMedia(valores: number[]): number {
    let soma = valores.reduce((acc, valor) => acc + valor, 0);
    return soma / valores.length;
  }

  getGeneroMaisComum(): string {
    let generosCount: { [genero: string]: number } = {};

    // Conta a ocorrência de cada gênero
    this.alunos.forEach((aluno) => {
      if (generosCount[aluno.genero]) {
        generosCount[aluno.genero]++;
      } else {
        generosCount[aluno.genero] = 1;
      }
    });

    let generoMaisComum = "";
    let maiorContagem = 0;

    // Encontra o gênero com a maior contagem
    for (let genero in generosCount) {
      if (generosCount[genero] > maiorContagem) {
        generoMaisComum = genero;
        maiorContagem = generosCount[genero];
      }
    }

    return generoMaisComum;
  }
}

// Instância da turma
let turma = new Turma("1", "Turma A");

// Função para alternar a exibição do formulário
function alternarForm(): void {
  let formAlunos = document.getElementById("formAlunos") as HTMLDivElement;
  let botaoAdicionar = document.querySelector("button") as HTMLButtonElement;

  // Alternar a exibição do formulário e atualizar o texto do botão
  formAlunos.style.display =
    formAlunos.style.display === "none" ? "block" : "none";
  botaoAdicionar.textContent =
    formAlunos.style.display === "none"
      ? "Exibir Formulário"
      : "Recolher Formulário";

  // Adicionar ou remover classe para alterar a cor do botão
  botaoAdicionar.classList.toggle(
    "botaoAtivo",
    formAlunos.style.display === "block"
  );
}

// Função para obter dados da API Random User
async function alunoAleatorio(): Promise<any> {
  let response = await fetch("https://randomuser.me/api/");
  let data = await response.json();
  return data.results[0];
}

// Função para gerar automaticamente dados de um aluno
async function gerarAutomatico(): Promise<void> {
  let dadosAlunoAleatorio = await alunoAleatorio();
  let { name, dob, gender } = dadosAlunoAleatorio;
  let nomeInserido = document.getElementById("nome") as HTMLInputElement;
  let idadeInserido = document.getElementById("idade") as HTMLInputElement;
  let generoInserido = document.getElementById("genero") as HTMLSelectElement;
  let alturaInserido = document.getElementById("altura") as HTMLInputElement;
  let pesoInserido = document.getElementById("peso") as HTMLInputElement;
  let aptFisicaInserido = document.getElementById(
    "aptFisica"
  ) as HTMLInputElement;
  let freqCardiacaInserido = document.getElementById(
    "freqCardiaca"
  ) as HTMLInputElement;

  nomeInserido.value = `${name.first} ${name.last}`;
  idadeInserido.value = (
    new Date().getFullYear() - new Date(dob.date).getFullYear()
  ).toString();
  generoInserido.value = gender.toString();
  alturaInserido.value = gerarValoresAleatorios(1.5, 2.0, 2).toString();
  pesoInserido.value = gerarValoresAleatorios(40, 120, 0).toString();
  aptFisicaInserido.value = gerarValoresAleatorios(1, 10, 0).toString();
  freqCardiacaInserido.value = gerarValoresAleatorios(60, 100, 0).toString();
}

// Função para gerar valores que a API não possui
function gerarValoresAleatorios(
  min: number,
  max: number,
  casaDecimal: number
): number {
  let rand = Math.random() * (max - min) + min;
  return parseFloat(rand.toFixed(casaDecimal));
}

// Função para adicionar um novo aluno à turma
function adicionarAluno(): void {
  let form = document.getElementById("adicionarAlunos") as HTMLFormElement;
  let nome = (form.elements.namedItem("nome") as HTMLInputElement).value;
  let idade = parseInt(
    (form.elements.namedItem("idade") as HTMLInputElement).value
  );
  let genero = (form.elements.namedItem("genero") as HTMLSelectElement).value;
  let altura = parseFloat(
    (form.elements.namedItem("altura") as HTMLInputElement).value
  );
  let peso = parseFloat(
    (form.elements.namedItem("peso") as HTMLInputElement).value
  );
  let aptFisica = parseInt(
    (form.elements.namedItem("aptFisica") as HTMLInputElement).value
  );
  let freqCardiaca = parseInt(
    (form.elements.namedItem("freqCardiaca") as HTMLInputElement).value
  );

  // Verificar se algum campo está vazio
  if (
    nome === "" ||
    isNaN(idade) ||
    isNaN(altura) ||
    isNaN(peso) ||
    isNaN(aptFisica) ||
    isNaN(freqCardiaca)
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let aluno = new Aluno(
    "",
    nome,
    idade,
    altura,
    peso,
    genero,
    aptFisica,
    freqCardiaca
  );
  turma.adicionarAluno(aluno);
  renderizarListaAlunos(aluno);

  // Limpar formulário
  form.reset();
}

// Variável para definir se o estado de Edição está ativo ou não
let alunoEdit: Aluno | null = null;

// Função para editar um aluno
function editarAluno(aluno: Aluno): void {
  let formAlunos = document.getElementById("formAlunos") as HTMLDivElement;

  // Verificar se o formulário está visível
  if (formAlunos.style.display !== "block") {
    alert("Por favor, exiba o formulário antes de editar um aluno.");
    return;
  }

  let form = document.getElementById("adicionarAlunos") as HTMLFormElement;
  let botaoSalvar = document.getElementById(
    "addAlunoNormal"
  ) as HTMLButtonElement;
  botaoSalvar.textContent = "Salvar Mudança";

  // Preencher o formulário com os dados do aluno selecionado
  (form.elements.namedItem("nome") as HTMLInputElement).value = aluno.nome;
  (form.elements.namedItem("idade") as HTMLInputElement).value =
    aluno.idade.toString();
  (form.elements.namedItem("genero") as HTMLSelectElement).value =
    aluno.genero.toString();
  (form.elements.namedItem("altura") as HTMLInputElement).value =
    aluno.altura.toString();
  (form.elements.namedItem("peso") as HTMLInputElement).value =
    aluno.peso.toString();
  (form.elements.namedItem("aptFisica") as HTMLInputElement).value =
    aluno.aptFisica.toString();
  (form.elements.namedItem("freqCardiaca") as HTMLInputElement).value =
    aluno.freqCardiaca.toString();

  alunoEdit = aluno;
}

// Função para salvar as mudanças feitas em um aluno
function salvarMudanças(): void {
  if (!alunoEdit) return;

  let form = document.getElementById("adicionarAlunos") as HTMLFormElement;
  let nome = (form.elements.namedItem("nome") as HTMLInputElement).value;
  let idade = parseInt(
    (form.elements.namedItem("idade") as HTMLInputElement).value
  );
  let genero = (form.elements.namedItem("genero") as HTMLSelectElement).value;
  let altura = parseFloat(
    (form.elements.namedItem("altura") as HTMLInputElement).value
  );
  let peso = parseFloat(
    (form.elements.namedItem("peso") as HTMLInputElement).value
  );
  let aptFisica = parseInt(
    (form.elements.namedItem("aptFisica") as HTMLInputElement).value
  );
  let freqCardiaca = parseInt(
    (form.elements.namedItem("freqCardiaca") as HTMLInputElement).value
  );

  alunoEdit.nome = nome;
  alunoEdit.idade = idade;
  alunoEdit.genero = genero;
  alunoEdit.altura = altura;
  alunoEdit.peso = peso;
  alunoEdit.aptFisica = aptFisica;
  alunoEdit.freqCardiaca = freqCardiaca;

  turma.atualizarEstatisticas();

  // Atualizar a lista de alunos
  let listaAlunos = document.getElementById("alunos")!;
  listaAlunos.innerHTML = ""; // Limpar a lista
  turma.alunos.forEach((aluno) => renderizarListaAlunos(aluno));

  // Restaurar o botão para "Adicionar Aluno"
  let botaoSalvar = document.getElementById(
    "addAlunoNormal"
  ) as HTMLButtonElement;
  botaoSalvar.textContent = "Adicionar Aluno";
  botaoSalvar.onclick = adicionarAluno;
  alunoEdit = null;

  form.reset();
}

// Função para remover um aluno da turma
function removerAluno(aluno: Aluno) {
  let index = turma.alunos.indexOf(aluno);
  if (index !== -1) {
    turma.alunos.splice(index, 1);
    turma.atualizarEstatisticas();
  }
}

// Função para renderizar a lista de alunos
function renderizarListaAlunos(aluno: Aluno): void {
  let listaAlunos = document.getElementById("alunos")!;
  let li = document.createElement("li");
  li.innerHTML = `
    <strong>Nome</strong>: ${aluno.nome} <br>
    <strong>Idade</strong>: ${aluno.idade} <br>
    <strong>Gênero</strong>: ${aluno.genero} <br>
    <strong>Altura</strong>: ${aluno.altura.toFixed(2)}m <br>
    <strong>Peso</strong>: ${aluno.peso}kg <br>
    <strong>Nível de Aptidão Física</strong>: ${aluno.aptFisica} <br>
    <strong>Frequência Cardíaca em Repouso</strong>: ${
      aluno.freqCardiaca
    }bpm <br>
  `;

  // Criando um botão para Edição dos alunos
  let botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.classList.add("botaoEditar");
  botaoEditar.addEventListener("click", () => {
    editarAluno(aluno);
    let botaoSalvar = document.getElementById(
      "addAlunoNormal"
    ) as HTMLButtonElement;
    botaoSalvar.textContent = "Salvar Mudança";
    botaoSalvar.onclick = () => salvarMudanças();
  });

  li.appendChild(botaoEditar);

  // Criando um botão para Exclusão dos alunos
  let botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.classList.add("botaoExcluir");
  botaoExcluir.addEventListener("click", () => {
    removerAluno(aluno);
    listaAlunos.removeChild(li);
  });

  li.appendChild(botaoExcluir);

  // Adicionando o Aluno na lista
  listaAlunos.appendChild(li);
}
