function raio() {
  // Obtém o valor do raio do elemento HTML com o id "raio"
  let raio = parseFloat(document.getElementById("raio").value);
  // Verifica se o valor do raio é inválido (não é um número ou é menor ou igual a zero)
  if (isNaN(raio) || raio <= 0) {
    alert("Por favor, insira um valor válido para o raio!");
    return;
  }

  // Calcula a área do círculo
  let area = Math.PI * Math.pow(raio, 2);
  // Calcula a circunferência do círculo
  let circunferencia = 2 * Math.PI * raio;

  // Atualiza o conteúdo do elemento HTML com o id "resultado" com os valores calculados
  document.getElementById("resultado").innerHTML = `
  <label for="area">Área do Círculo </label>
  <input type="text" value="${area.toFixed(2)}" readonly />
  <br />
  <label for="circunferencia">Circunferência </label>
  <input type="text" value="${circunferencia.toFixed(2)}" readonly />
  `;
}
