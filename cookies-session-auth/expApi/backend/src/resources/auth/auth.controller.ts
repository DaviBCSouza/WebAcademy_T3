import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createUsuario } from "../usuario/usuario.service";
import { checkCredentials } from "./auth.service";

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

  const usuario = req.body;
  try {
    const novoUsuario = await createUsuario(usuario, "client");
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

  const credentials = req.body;
  try {
    const usuario = await checkCredentials(credentials);
    if (!usuario)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ReasonPhrases.UNAUTHORIZED);
    req.session.uid = usuario.id;
    req.session.tipoUsuarioId = usuario.tipoUsuarioId;
    res.status(StatusCodes.OK).json(usuario);
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

  if (req.session.uid) {
    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" });
      res.status(StatusCodes.OK).json({ msg: "Logout realizado com sucesso" });
    });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }
};

export default { signup, login, logout };
