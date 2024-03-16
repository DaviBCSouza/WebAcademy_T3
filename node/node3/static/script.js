document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtendo o número de parágrafos do campo de entrada
  const numParagrafos = document.getElementById("paragrafos").value;

  try {
    // Fazendo uma requisição assíncrona para obter o texto Lorem
    const response = await fetch(`/lorem/${numParagrafos}`);

    if (!response.ok) throw new Error("Erro ao obter texto Lorem.");

    // Extraindo o conteúdo da resposta como texto
    const html = await response.text();

    // Atualizando o elemento HTML com o texto Lorem obtido
    document.getElementById("lorem-texto").innerHTML = html;
  } catch (err) {
    // Em caso de erro, exibe a mensagem de erro no elemento HTML
    console.error(err);
    document.getElementById("lorem-texto").innerHTML = `<p>${err}</p>`;
  }
});
