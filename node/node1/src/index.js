const http = require("http");
const fs = require("fs");
const { createLink } = require("./utils");

// Obtendo o nome do diretório a partir do parâmetro da linha de comando
const dir = process.argv[2];

// Verificando se foi passado algum parâmetro
if (!dir) {
  console.log("Por favor, forneça o nome de um diretório");
  process.exit();
}

// Criando o servidor
const server = http.createServer((req, res) => {
  let url = req.url;

  //Se o usuário acessar a página inicial (/), listar os arquivos
  if (url === "/") {
    fs.readdir(dir, (err, arquivos) => {
      if (err) throw err;
      let html = `<h4>Arquivos do Diretório "${dir}"</h4>`;
      arquivos.forEach((arquivo) => {
        html += createLink(arquivo);
      });

      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write(html);
      res.end();
    });
  } else {
    //Se o usuário acessar um arquivo específico, mostrar o seu conteúdo
    let path = dir + url;

    fs.readFile(path, "utf8", (err, conteudo) => {
      if (err) throw err;
      let html = `<h4>Contéudo do Arquivo "${url}"</h4>`;
      html += `<a href="/">Voltar</a>`;
      html += `<pre>${conteudo}</pre>`;

      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write(html);
      res.end();
    });
  }
});

// Configurando o dotenv
const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Definindo a porta do servidor
const PORT = process.env.PORT ?? 5000;

// Iniciando o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
