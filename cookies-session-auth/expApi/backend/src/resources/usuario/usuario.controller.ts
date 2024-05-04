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
import {
  CreateUsuarioDto,
  TipoUsuario,
  UpdateUsuarioDto,
} from "./usuario.types";

// Controlador para o "/v1/usuario"
const index = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Lista todos os usuários.'
   #swagger.responses[200] = { description: 'Lista de usuários retornada com sucesso.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  try {
    const usuarios = await getAllUsuarios();
    res.status(StatusCodes.OK).json(usuarios);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para o "/v1/usuario"
const create = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Cria um novo usuário.'
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Dados do novo usuário.',
     schema: { $ref: '#/definitions/CreateUsuarioDto' }
   }
   #swagger.responses[201] = {
     description: 'Usuário criado com sucesso.',
     schema: { $ref: '#/definitions/UsuarioDto' }
   }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const usuario = req.body as CreateUsuarioDto;
  const tipoUsuario = req.query.tipoUsuario as TipoUsuario;
  try {
    const novoUsuario = await createUsuario(usuario, tipoUsuario);
    res.status(StatusCodes.OK).json(novoUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para o "/v1/usuario/'id'"
const read = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Recupera dados de um usuário específico por ID.'
   #swagger.parameters['id'] = { description: 'ID do usuário' }
   #swagger.responses[200] = {
     description: 'Usuário encontrado.',
     schema: { $ref: '#/definitions/UsuarioDto' }
   }
   #swagger.responses[404] = { description: 'Usuário não encontrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

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
  /*
   #swagger.summary = 'Recupera dados de um usuário específico por e-mail.'
   #swagger.parameters['email'] = { description: 'E-mail do usuário' }
   #swagger.responses[200] = {
     description: 'Usuário encontrado.',
     schema: { $ref: '#/definitions/UsuarioDto' }
   }
   #swagger.responses[404] = { description: 'Usuário não encontrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

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
  /*
   #swagger.summary = 'Atualiza dados de um usuário específico.'
   #swagger.parameters['id'] = { description: 'ID do usuário' }
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Dados atualizados do usuário.',
     schema: { $ref: '#/definitions/UpdateUsuarioDto' }
   }
   #swagger.responses[204] = { description: 'Atualização bem-sucedida.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

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
  /*
   #swagger.summary = 'Remove um usuário específico.'
   #swagger.parameters['id'] = { description: 'ID do usuário' }
   #swagger.responses[204] = { description: 'Remoção bem-sucedida.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const { id } = req.params;
  try {
    const deletedUsuario = await deleteUsuario(id);
    res.status(StatusCodes.NO_CONTENT).json(deletedUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, readEmail, update, remove };
