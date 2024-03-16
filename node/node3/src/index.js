import dotenv from "dotenv";
import http from "http";
import { generateLoremText, readFileContent } from "./utils.js";

// Obtendo o nome do diretório a partir do parâmetro da linha de comando
const dir = process.argv[2];

// Criando o servidor
const server = http.createServer(async (req, res) => {
  let url = req.url;

  // Lidando com as diferentes rotas
  if (url === "/") {
    let html = await readFileContent(dir, "/index.html");

    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write(html);
    res.end();
  } else if (url === "/style.css") {
    let css = await readFileContent(dir, "/style.css");

    res.writeHead(200, { "Content-Type": "text/css;charset=utf-8" });
    res.write(css);
    res.end();
  } else if (url === "/script.js") {
    let js = await readFileContent(dir, "/script.js");

    res.writeHead(200, {
      "Content-Type": "application/javascript;charset=utf-8",
    });
    res.write(js);
    res.end();
  } else if (url.startsWith("/lorem")) {
    let numParagrafos = parseInt(url.split("/")[2]);
    let textoLorem = generateLoremText(numParagrafos);

    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write(textoLorem);
    res.end();
  }
});

// Configurando o dotenv
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Definindo a porta do servidor
const PORT = process.env.PORT ?? 5000;

// Iniciando o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
