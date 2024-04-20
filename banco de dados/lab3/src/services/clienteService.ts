import { PrismaClient } from "@prisma/client";
import { Cliente } from "../models/cliente";
import { CreateClienteDto } from "../models/dto/CreateClienteDto";
import { UpdateClienteDto } from "../models/dto/UpdateClienteDto";

const prisma = new PrismaClient();

export const listClientes = async (): Promise<Cliente[]> => {
  return await prisma.cliente.findMany();
};

export const createCliente = async (
  cliente: CreateClienteDto
): Promise<Cliente> => {
  try {
    const { endereco, ...clienteData } = cliente;
    if (endereco) {
      return await prisma.cliente.create({
        data: {
          ...clienteData,
          endereco: {
            create: endereco,
          },
        },
      });
    } else {
      return await prisma.cliente.create({
        data: {
          ...clienteData,
        },
      });
    }
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

export const getCliente = async (cpf: string): Promise<Cliente | null> => {
  return await prisma.cliente.findUnique({ where: { cpf } });
};

export const updateCliente = async (
  cpf: string,
  novoCliente: UpdateClienteDto
): Promise<Cliente> => {
  try {
    if (novoCliente.endereco) {
      const cliente = await prisma.cliente.findUnique({
        where: { cpf },
        include: { endereco: true },
      });

      if (!cliente) {
        throw new Error(`Cliente com CPF ${cpf} não encontrado.`);
      }

      if (cliente.endereco) {
        const enderecoId = cliente.endereco[0].id;
        await prisma.endereco.update({
          where: { id: enderecoId },
          data: novoCliente.endereco,
        });
      }
    }

    return await prisma.cliente.update({
      where: { cpf },
      data: {
        ...novoCliente,
        endereco: undefined,
      },
    });
  } catch (error) {
    console.error("Ocorreu um erro durante a atualização do cliente:", error);
    throw new Error("Falha ao atualizar o cliente.");
  }
};

export const deleteCliente = async (cpf: string): Promise<Cliente> => {
  try {
    await prisma.endereco.deleteMany({ where: { cliente_cpf: cpf } });
    return await prisma.cliente.delete({ where: { cpf } });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    throw error;
  }
};
