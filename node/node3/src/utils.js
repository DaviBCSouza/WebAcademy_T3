import fs from "fs/promises";
import { loremIpsum } from "lorem-ipsum";

// Função para ler o conteúdo de um arquivo
export async function readFileContent(dir, url) {
  try {
    let path = `${dir}${url}`;
    let conteudo = await fs.readFile(path, "utf8");
    return conteudo;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

// Função para gerar texto Lorem
export function generateLoremText(numParagrafos) {
  if (isNaN(numParagrafos)) {
    return "Sem valores nulos por aqui! Digite um número válido";
  } else {
    return loremIpsum({
      count: numParagrafos,
      units: "paragraph",
      format: "html",
    });
  }
}
