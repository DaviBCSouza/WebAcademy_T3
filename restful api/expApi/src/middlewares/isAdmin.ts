import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { checkIsAdmin } from "../resources/auth/auth.service";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.session.uid;
  if (uid && (await checkIsAdmin(uid))) next();
  else
    res.status(StatusCodes.FORBIDDEN).json({ msg: "Usuário não autorizado!" });
};

export default isAdmin;
