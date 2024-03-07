// Obtendo referências para elementos HTML relevantes
const imagemExibida = document.querySelector(".imagem-exibida");
const imagens = document.querySelector(".imagens");
const botao = document.querySelector("button");
const sobreposicao = document.querySelector(".sobreposicao");

// Declarando um array com o nome dos arquivos
const fotos = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

// Declarando um texto alternativo para cada imagem (caso não carregar)
const alts = {
  "pic1.jpg": "Batman",
  "pic2.jpg": "Programming",
  "pic3.jpg": "Demon Slayer",
  "pic4.jpg": "Consoles",
  "pic5.jpg": "Aurora Boreal",
};

// Percorrendo as imagens
for (const foto of fotos) {
  const novaFoto = document.createElement("img");
  novaFoto.setAttribute("src", `../images/${foto}`);
  novaFoto.setAttribute("alt", alts[foto]);
  imagens.appendChild(novaFoto);

  // Adiciona um ouvinte de evento para cada imagem em miniatura
  novaFoto.addEventListener("click", (e) => {
    imagemExibida.src = e.target.src; // Atualiza a imagem principal com a imagem em miniatura clicada
    imagemExibida.alt = e.target.alt; // Atualiza o texto alternativo da imagem principal
  });
}

// Alternando as sobreposições
botao.addEventListener("click", () => {
  const classeBotao = botao.getAttribute("class"); // Obtém a classe atual do botão

  // Verifica a classe atual do botão para determinar a ação a ser tomada
  if (classeBotao === "dark") {
    botao.setAttribute("class", "light");
    botao.textContent = "Normal";
    sobreposicao.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  } else {
    botao.setAttribute("class", "dark");
    botao.textContent = "Blur";
    sobreposicao.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
});
