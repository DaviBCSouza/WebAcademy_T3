import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ChangeLangDto } from "./language.types";

// Controlador para alterar o idioma em "v1/"
const changeLanguage = (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Altera o idioma da aplicação.'
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Objeto contendo o novo idioma.',
     schema: { $ref: '#/definitions/ChangeLangDto' }
   }
   #swagger.responses[204] = { description: 'Idioma alterado com sucesso.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.', }
  */

  const { lang } = req.body as ChangeLangDto;
  res.cookie("lang", lang);
  res.status(StatusCodes.NO_CONTENT).json();
};

export default { changeLanguage };
