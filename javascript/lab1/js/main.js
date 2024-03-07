// Obtendo referências para elementos HTML relevantes
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

// Função para retornar um valor aleatório de um array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Texto base da história com marcadores para inserção
const storyText =
  "<strong>:insertx:</strong> acordou animado com a ideia de explorar um novo lugar. Após dias de pesquisa, ele decidiu partir rumo a <strong>:inserty:</strong>, uma localização lendária envolta em mistério e perigo, para saciar sua sede de aventura. Ao chegar lá, <strong>:insertz:</strong>, desvendando segredos há muito perdidos. Surpreendentemente, <strong>Name</strong> estava presente, observando a cena com curiosidade, mas sua reação foi tranquila, afinal, situações incomuns com o <strong>:insertx:</strong> são corriqueiras.";

// Arrays de opções para substituição nos marcadores da história
const insertX = ["Indiana Jones", "Capitão Jack Sparrow", "Doutor Estranho"];
const insertY = [
  "cidade perdida de Atlântida",
  "base secreta da SHIELD",
  "um planeta desconhecido",
];
const insertZ = [
  "descobriu um artefato antigo de imenso poder",
  "foi cercado por seres extraterrestres amigáveis",
  "mergulhou nas profundezas de um lago mágico",
];

// Adicionando o EventListener para o botão "randomize"
randomize.addEventListener("click", result);

// Função para gerar a história
function result() {
  let newStory = storyText; // Cria uma cópia do texto base da história

  // Seleciona aleatoriamente um elemento de cada array e substitui os marcadores no texto base
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replaceAll(":inserty:", yItem);
  newStory = newStory.replaceAll(":insertz:", zItem);

  // Se o campo de nome personalizado não estiver vazio, substitui "Name" pelo nome personalizado
  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replaceAll("Name", name);
  }

  // Atualiza o conteúdo da história com a nova história gerada
  story.innerHTML = newStory;
  // Torna a história visível
  story.style.visibility = "visible";
}
