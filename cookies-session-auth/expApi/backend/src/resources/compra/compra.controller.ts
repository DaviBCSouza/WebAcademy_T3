import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  concluirCompra,
  createCompra,
  deleteCompra,
  getCompra,
  listCompras,
  updateCompra,
} from "./compra.service";
import { CreateCompraDto, UpdateCompraDto } from "./compra.types";

// Controlador para listar todas as compras em "v1/compra/"
const index = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Lista todas as compras.'
   #swagger.responses[200] = {
     description: 'Lista de compras retornada com sucesso.',
     schema: { $ref: '#/definitions/Compra' }
   }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  try {
    const compras = await listCompras();
    res.status(StatusCodes.OK).json(compras);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para criar uma compra sem produtos em "v1/compra/"
const create = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Cria uma nova compra sem produtos.'
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Dados da nova compra.',
     schema: { $ref: '#/definitions/CreateCompraDto' }
   }
   #swagger.responses[201] = {
     description: 'Compra criada com sucesso.',
     schema: { $ref: '#/definitions/Compra' }
   }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const compra = req.body as CreateCompraDto;
  try {
    const novaCompra = await createCompra(compra);
    res.status(StatusCodes.CREATED).json(novaCompra);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para pegar uma compra em "v1/compra/'id'"
const read = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Recupera dados de uma compra específica por ID.'
   #swagger.parameters['id'] = { description: 'ID da compra' }
   #swagger.responses[200] = {
     description: 'Compra encontrada.',
     schema: { $ref: '#/definitions/Compra' }
   }
   #swagger.responses[404] = { description: 'Compra não encontrada.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const { id } = req.params;
  try {
    const compra = await getCompra(id);
    if (!compra)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(compra);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para atualizar as informações de uma compra em "v1/compra/'id'"
const update = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Atualiza informações de uma compra específica.'
   #swagger.parameters['id'] = { description: 'ID da compra' }
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Dados atualizados da compra.',
     schema: { $ref: '#/definitions/UpdateCompraDto' }
   }
   #swagger.responses[204] = { description: 'Atualização bem-sucedida.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const { id } = req.params;
  const compra = req.body as UpdateCompraDto;
  try {
    const updatedCompra = await updateCompra(id, compra);
    res.status(StatusCodes.NO_CONTENT).json(updatedCompra);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para excluir uma compra em "v1/compra/'id'"
const remove = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Remove uma compra específica.'
   #swagger.parameters['id'] = { description: 'ID da compra' }
   #swagger.responses[204] = { description: 'Remoção bem-sucedida.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const { id } = req.params;
  try {
    const deletedCompra = await deleteCompra(id);
    res.status(StatusCodes.NO_CONTENT).json(deletedCompra);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para adicionar produtos ao carrinho em "v1/compra/adicionar"
const addProduto = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Adiciona produtos ao carrinho de compras.'
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Informações do produto a ser adicionado ao carrinho.',
     schema: { $ref: '#/definitions/AddProduto' }
   }
   #swagger.responses[200] = {
     description: 'Produto adicionado ao carrinho com sucesso.',
     schema: { $ref: '#/definitions/Carrinho' }
   }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  const { produtoId, quantidade } = req.body;
  try {
    const carrinho = req.session.carrinho || {};

    if (carrinho[produtoId]) {
      carrinho[produtoId] += quantidade;
    } else {
      carrinho[produtoId] = quantidade;
    }

    req.session.carrinho = carrinho;

    res.status(StatusCodes.OK).json({
      message: "Produto adicionado ao carrinho com sucesso",
      carrinho,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para concluir uma compra em "v1/compra/concluir"
const checkoutCompra = async (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Conclui uma compra.'
   #swagger.responses[200] = {
     description: 'Compra concluída com sucesso.',
     schema: { $ref: '#/definitions/Checkout' }
   }
   #swagger.responses[400] = { description: 'Carrinho de compras vazio.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */

  try {
    const usuarioId = req.session.uid as string;
    const carrinho = req.session.carrinho || {};

    if (Object.keys(carrinho).length === 0) {
      throw new Error("Carrinho de compras vazio");
    }

    const compra = await concluirCompra(usuarioId, carrinho);

    // Limpar o carrinho de compras da sessão após a conclusão da compra
    req.session.carrinho = {};

    res
      .status(StatusCodes.OK)
      .json({ message: "Compra concluída com sucesso", compra });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default {
  index,
  create,
  read,
  update,
  remove,
  addProduto,
  checkoutCompra,
};
