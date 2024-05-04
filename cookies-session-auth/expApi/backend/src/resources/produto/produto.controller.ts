import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  checkNomeIsAvaliable,
  createProduto,
  deleteProduto,
  getProduto,
  listProdutos,
  updateProduto,
} from "./produto.service";
import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types";

// Controlador para o "/v1/produto/"
const index = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Lista todos os produtos.'
   #swagger.responses[200] = { description: 'Lista de produtos retornada com sucesso.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  try {
    const produtos = await listProdutos();
    res.status(StatusCodes.OK).json(produtos);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador de criar um produto para o "/v1/produto/"
const create = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Adiciona um novo produto na base.'
 #swagger.parameters['body'] = {
 description: 'Objeto contendo os dados do produto',
 in: 'body',
 schema: { $ref: '#/definitions/CreateProdutoDto' }
 }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Produto' }
 }
 */

  const produto = req.body as CreateProdutoDto;
  try {
    if (await checkNomeIsAvaliable(produto.nome)) {
      const novoProduto = await createProduto(produto);
      res.status(StatusCodes.CREATED).json(novoProduto);
    } else {
      res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador de pegar um produto para o "/v1/produto/:id"
const read = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Recupera dados de um produto específico.'
 #swagger.parameters['id'] = { description: 'ID do produto' }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Produto' }
 }
 */

  const { id } = req.params;
  try {
    const produto = await getProduto(id);
    if (!produto)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(produto);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador de atualizar um produto para o "/v1/produto/:id"
const update = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Atualiza dados de um produto específico.'
 #swagger.parameters['id'] = { description: 'ID do produto' }
  #swagger.parameters['body'] = {
 description: 'Objeto contendo as alterações do produto',
 in: 'body',
 schema: { $ref: '#/definitions/UpdateProdutoDto' }
 }
 #s
 #swagger.responses[204] = { description: 'Atualização bem-sucedida.' }
 #swagger.responses[404] = { description: 'Produto não encontrado.' }
 #swagger.responses[409] = { description: 'Nome de produto já existente.' }
 */

  const { id } = req.params;
  const produto = req.body as UpdateProdutoDto;
  try {
    if (await checkNomeIsAvaliable(produto.nome, id)) {
      const updatedProduto = await updateProduto(id, produto);
      res.status(StatusCodes.NO_CONTENT).json(updatedProduto);
    } else {
      res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador de remover um produto para o "/v1/produto/:id"
const remove = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Remove um produto específico.'
   #swagger.parameters['id'] = { description: 'ID do produto' }
   #swagger.responses[204] = { description: 'Remoção bem-sucedida.' }
   #swagger.responses[404] = { description: 'Produto não encontrado.' }
  */

  const { id } = req.params;
  try {
    const deletedProduto = await deleteProduto(id);
    res.status(StatusCodes.NO_CONTENT).json(deletedProduto);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
