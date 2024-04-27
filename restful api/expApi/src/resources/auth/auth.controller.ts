import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TiposUsuarios from "../tipoUsuario/tipoUsuario.constants";
import { createUsuario, getUsuarioEmail } from "../usuario/usuario.service";
import { checkAuth } from "./auth.service";
import { SignUpDto } from "./auth.types";

// Controlador para cadastro de usuário em "/v1/signup"
const signup = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Cadastra um novo usuário.'
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Dados do novo usuário.',
     schema: { $ref: '#/definitions/SignUpDto' }
   }
   #swagger.responses[201] = {
     description: 'Usuário cadastrado com sucesso.',
     schema: { $ref: '#/definitions/Usuario' }
   }
   #swagger.responses[400] = { description: 'E-mail informado já está sendo utilizado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const usuario = req.body as SignUpDto;
  try {
    if (await getUsuarioEmail(usuario.email))
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "E-mail informado já está sendo utilizado!" });
    const novoUsuario = await createUsuario({
      ...usuario,
      tipoUsuarioId: TiposUsuarios.CLIENT,
    });
    res.status(StatusCodes.CREATED).json(novoUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para logar o usuário em "/v1/login"
const login = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Autentica o usuário.'
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Credenciais de login.',
     schema: { $ref: '#/definitions/LoginDto' }
   }
   #swagger.responses[200] = { description: 'Usuário autenticado com sucesso.' }
   #swagger.responses[401] = { description: 'Email e/ou senha incorretos.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const { email, senha } = req.body;
  try {
    const usuario = await checkAuth({ email, senha });
    if (!usuario)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Email e/ou senha incorretos!" });
    req.session.uid = usuario.id;
    req.session.tipoUsuario = usuario.tipoUsuarioId;
    res.status(StatusCodes.OK).json({ msg: "Usuário autenticado" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para logout do usuário em "/v1/logout"
const logout = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Realiza o logout do usuário.'
   #swagger.responses[200] = { description: 'Logout realizado com sucesso.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      } else {
        res.clearCookie("connect.sid", { path: "/" });
        res
          .status(StatusCodes.OK)
          .json({ msg: "Logout realizado com sucesso" });
      }
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { signup, login, logout };
