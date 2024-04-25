import Joi from "joi";

export const produtoSchema = Joi.object().keys({
  nome: Joi.string().min(5).max(100).required(),
  preco: Joi.number().required(),
  estoque: Joi.number().positive().integer().required(),
});
