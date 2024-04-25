import Joi from "joi";

export const languageSchema = Joi.object().keys({
  lang: Joi.valid("pt-BR", "en-US").required().messages({
    "any.only": "Compatível somente com 'pt-BR' ou 'en-US'",
  }),
});
