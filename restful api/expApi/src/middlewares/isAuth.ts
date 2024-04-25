import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { checkIsAuth } from "../resources/auth/auth.service";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.session.uid;
  if (uid && (await checkIsAuth(uid))) next();
  else
    res
      .status(StatusCodes.FORBIDDEN)
      .json({
        msg: "Usuário não logado! Por favor, crie uma conta ou entre em uma conta.",
      });
};

export default isAuth;
