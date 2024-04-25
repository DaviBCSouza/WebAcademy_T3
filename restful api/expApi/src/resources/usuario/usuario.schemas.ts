import Joi from "joi";

export const usuarioSchema = Joi.object().keys({
  tipoUsuarioId: Joi.string().min(5).max(40).required(),
  nome: Joi.string().min(5).max(100).required(),
  email: Joi.string().min(5).max(100).required(),
  senha: Joi.string().min(5).max(60).required(),
});
