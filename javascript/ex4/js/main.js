function drawChart() {
  // Obtendo os valores das barras
  var bar1 = document.getElementById("bar1").value;
  var bar2 = document.getElementById("bar2").value;
  var bar3 = document.getElementById("bar3").value;
  var bar4 = document.getElementById("bar4").value;
  var bar5 = document.getElementById("bar5").value;

  // Obtendo a largura das barras
  var barWidth = document.getElementById("barWidth").value;

  // Obtendo o elemento do gráfico
  var chart = document.getElementById("chart");

  // Limpar o conteúdo do gráfico
  chart.innerHTML = "";

  // Criar as barras
  createBar(chart, bar1, barWidth);
  createBar(chart, bar2, barWidth);
  createBar(chart, bar3, barWidth);
  createBar(chart, bar4, barWidth);
  createBar(chart, bar5, barWidth);
}

// Função para criar uma barra
function createBar(parent, value, width) {
  var bar = document.createElement("div");
  bar.className = "bar";
  bar.style.width = width + "px";
  bar.innerHTML = '<span style="height:' + value + 'px;">' + value + "</span>";
  parent.appendChild(bar);
}
