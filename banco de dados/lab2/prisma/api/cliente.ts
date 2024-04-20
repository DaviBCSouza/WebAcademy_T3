import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definindo as informações do Cliente de acordo com o BD
interface Cliente {
  cpf: string;
  nome: string;
  data_nascimento: Date;
  celular: string;
  email: string;
}

// Criando a função para gerar cpf automáticamente
function gerarCPF(): string {
  let cpf = "";
  for (let i = 0; i < 11; i++) {
    cpf += Math.floor(Math.random() * 10).toString();
  }
  return cpf;
}

// Função para gerar um cliente aleatório
export const createClient = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }
    const data = await response.json();
    const results = data.results[0];

    const Cliente: Cliente = {
      cpf: gerarCPF(),
      nome: `${results.name.first} ${results.name.last}`,
      data_nascimento: new Date(results.dob.date),
      celular: results.cell,
      email: results.email,
    };

    const novoCliente = await prisma.cliente.create({
      data: Cliente,
    });

    console.log("Novo cliente criado:", novoCliente);
    return novoCliente;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};
