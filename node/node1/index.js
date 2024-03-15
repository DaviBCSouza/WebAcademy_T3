const http = require("http");
const fs = require("fs");

// Obtendo o nome do diretório a partir do parâmetro da linha de comando
const dir = process.argv[2];

// Verificando se foi passado algum parâmetro
if (!dir) {
  console.log("Por favor, forneça o nome de um diretório");
  process.exit();
}

// Criando o servidor
const server = http.createServer((req, res) => {
  fs.readdir(dir, (err, arquivos) => {
    if (err) throw err;
    let html = `<h4>Arquivos do Diretório "${dir}"</h4>`;
    arquivos.forEach((arquivo) => {
      html += `${arquivo}<br>`;
    });

    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write(html);
    res.end();
  });
});

// Configurando o dotenv
require("dotenv").config();

// Definindo a porta do servidor
const PORT = process.env.PORT ?? 5000;

// Iniciando o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
