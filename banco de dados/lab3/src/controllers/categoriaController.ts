import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreateCategoriaDto } from "../models/dto/CreateCategoriaDto";
import { UpdateCategoriaDto } from "../models/dto/UpdateCategoriaDto";
import {
  createCategoria,
  deleteCategoria,
  getCategoria,
  listCategorias,
  updateCategoria,
} from "../services/categoriaService";

const index = async (req: Request, res: Response) => {
  try {
    const categorias = await listCategorias();
    res.status(StatusCodes.OK).json(categorias);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const categoria = req.body as CreateCategoriaDto;
  try {
    const novaCategoria = await createCategoria(categoria);
    res.status(StatusCodes.CREATED).json(novaCategoria);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await getCategoria(parseInt(id));
    if (!categoria)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(categoria);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoria = req.body as UpdateCategoriaDto;
  try {
    const updatedCategoria = await updateCategoria(parseInt(id), categoria);
    res.status(StatusCodes.NO_CONTENT).json(updatedCategoria);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCategoria = await deleteCategoria(parseInt(id));
    res.status(StatusCodes.NO_CONTENT).json(deletedCategoria);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
