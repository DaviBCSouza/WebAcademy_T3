import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  createUsuario,
  deleteUsuario,
  getAllUsuarios,
  getUsuarioEmail,
  getUsuarioId,
  updateUsuario,
} from "./usuario.service";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.types";

// Controlador para o "/v1/usuario"
const index = async (req: Request, res: Response) => {
  try {
    const usuarios = await getAllUsuarios();
    res.status(StatusCodes.OK).json(usuarios);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para o "/v1/usuario"
const create = async (req: Request, res: Response) => {
  const usuario = req.body as CreateUsuarioDto;
  try {
    const novoUsuario = await createUsuario(usuario);
    res.status(StatusCodes.CREATED).json(novoUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para o "/v1/usuario/'id'"
const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await getUsuarioId(id);
    if (!usuario)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(usuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para o "/v1/usuario/email/'email'"
const readEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const usuario = await getUsuarioEmail(email);
    if (!usuario)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(usuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para o "/v1/usuario/'id'"
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = req.body as UpdateUsuarioDto;
  try {
    const updatedUsuario = await updateUsuario(id, usuario);
    res.status(StatusCodes.NO_CONTENT).json(updatedUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para o "/v1/usuario/'id'"
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUsuario = await deleteUsuario(id);
    res.status(StatusCodes.NO_CONTENT).json(deletedUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, readEmail, update, remove };
