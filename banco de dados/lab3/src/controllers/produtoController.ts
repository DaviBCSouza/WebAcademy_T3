import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreateProdutoDto } from "../models/dto/CreateProdutoDto";
import { UpdateProdutoDto } from "../models/dto/UpdateProdutoDto";
import {
  createProduto,
  deleteProduto,
  getProduto,
  listProdutos,
  updateProduto,
} from "../services/produtoService";

const index = async (req: Request, res: Response) => {
  try {
    const produtos = await listProdutos();
    res.status(StatusCodes.OK).json(produtos);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const produto = req.body as CreateProdutoDto;
  try {
    const novoProduto = await createProduto(produto);
    res.status(StatusCodes.CREATED).json(novoProduto);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const produto = await getProduto(id);
    if (!produto)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(produto);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const produto = req.body as UpdateProdutoDto;
  try {
    const updatedProduto = await updateProduto(parseInt(id), produto);
    res.status(StatusCodes.NO_CONTENT).json(updatedProduto);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduto = await deleteProduto(parseInt(id));
    res.status(StatusCodes.NO_CONTENT).json(deletedProduto);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
