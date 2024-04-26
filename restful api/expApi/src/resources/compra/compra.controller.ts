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
  try {
    const compras = await listCompras();
    res.status(StatusCodes.OK).json(compras);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Controlador para criar uma compra sem produtos em "v1/compra/"
const create = async (req: Request, res: Response) => {
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
