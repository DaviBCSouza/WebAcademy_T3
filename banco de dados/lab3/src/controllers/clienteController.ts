import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreateClienteDto } from "../models/dto/CreateClienteDto";
import { UpdateClienteDto } from "../models/dto/UpdateClienteDto";
import {
  createCliente,
  deleteCliente,
  getCliente,
  listClientes,
  updateCliente,
} from "../services/clienteService";

const index = async (req: Request, res: Response) => {
  try {
    const clientes = await listClientes();
    res.status(StatusCodes.OK).json(clientes);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const cliente = req.body as CreateClienteDto;
  try {
    const novoCliente = await createCliente(cliente);
    res.status(StatusCodes.CREATED).json(novoCliente);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  const { cpf } = req.params;
  try {
    const produto = await getCliente(cpf);
    if (!produto)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(produto);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const { cpf } = req.params;
  const cliente = req.body as UpdateClienteDto;
  try {
    const updatedCliente = await updateCliente(cpf, cliente);
    res.status(StatusCodes.NO_CONTENT).json(updatedCliente);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const { cpf } = req.params;
  try {
    const deletedCliente = await deleteCliente(cpf);
    res.status(StatusCodes.NO_CONTENT).json(deletedCliente);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
