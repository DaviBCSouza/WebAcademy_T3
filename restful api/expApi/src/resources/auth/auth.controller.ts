import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TiposUsuarios from "../tipoUsuario/tipoUsuario.constants";
import { createUsuario, getUsuarioEmail } from "../usuario/usuario.service";
import { checkAuth } from "./auth.service";
import { SignUpDto } from "./auth.types";

// Controlador para cadastro de usuário em "/v1/signup"
const signup = async (req: Request, res: Response) => {
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
