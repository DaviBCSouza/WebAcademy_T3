import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";

dotenv.config();

const doc = {
  info: {
    title: "API da Loja virtual",
    description: "Documentação da API",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    Usuario: {
      id: "412507fb-e547-471a-9b67-46e10a046daa",
      nome: "Joana da Silva",
      email: "joana.s@gmail.com",
      senha: "$2a$15$QpCmQ0wX5MO2Qpe..wtIwuv1e1QEAYJQi7zXHZlX8mwCpvzQ9TWTi",
      tipoUsuarioId: "b994aeb7-8280-41ce-8bd9-67e173b83991",
      createdAt: "2024-04-26T03:43:15.354Z",
      updatedAt: "2024-04-26T03:43:15.354Z",
    },
    SignUpDto: {
      nome: "Joana da Silva",
      email: "joana.s@gmail.com",
      senha: "pass123",
    },
    LoginDto: {
      email: "joana.s@gmail.com",
      senha: "pass123",
    },
    UsuarioDto: {
      id: "dc82ec3e-c63a-4f1a-8528-97079f98d5e8",
      nome: "Minnie Koss",
      email: "Michel_Reichel40@hotmail.com",
      senha: "$2a$15$ycmbge0h5RBIMY1abI4Xqu1KHPheWAwWOa0afxLPnD/GsOKMa72Xa",
      tipoUsuarioId: "b994aeb7-8280-41ce-8bd9-67e173b83991",
      createdAt: "2024-04-25T15:21:13.930Z",
      updatedAt: "2024-04-25T15:21:13.930Z",
    },
    CreateUsuarioDto: {
      nome: "Minnie Koss",
      email: "Michel_Reichel40@hotmail.com",
      senha: "senha123",
      tipoUsuarioId: "b994aeb7-8280-41ce-8bd9-67e173b83991",
    },
    UpdateUsuarioDto: {
      nome: "Jeff Kilback",
      email: "Trey.Lakin@gmail.com",
      senha: "senha123",
      tipoUsuarioId: "b994aeb7-8280-41ce-8bd9-67e173b83991",
    },
    Produto: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      nome: "Cadeira",
      preco: 15.99,
      estoque: 10,
      createdAt: "2024-04-26T17:19:15.645Z",
      updatedAt: "2023-04-26T17:19:15.645Z",
    },
    CreateProdutoDto: {
      nome: "Cadeira",
      preco: 15.99,
      estoque: 10,
    },
    UpdateProdutoDto: {
      nome: "Mesa",
      preco: 29.9,
      estoque: 15,
    },
    Compra: {
      id: "adea68d3-ff25-4e7d-b4a3-d1de420fc9ef",
      usuarioId: "8027b18d-3757-4b91-83fe-213aae889bd2",
      createdAt: "2024-04-26T19:45:14.626Z",
      updatedAt: "2024-04-26T19:45:14.626Z",
    },
    CreateCompraDto: {
      usuarioId: "8027b18d-3757-4b91-83fe-213aae889bd2",
    },
    UpdateCompraDto: {
      usuarioId: "d94abff2-a6f3-4511-b8ac-8082381a949c",
    },
    AddProduto: {
      usuarioId: "d94abff2-a6f3-4511-b8ac-8082381a949c",
      produtoId: "4b3c2b4c-9af2-43cf-870e-34bfdefb4d37",
      quantidade: 2,
    },
    Carrinho: {
      message: "Produto adicionado ao carrinho com sucesso",
      carrinho: {
        "4b3c2b4c-9af2-43cf-870e-34bfdefb4d37": 2,
      },
    },
    Checkout: {
      message: "Compra concluída com sucesso",
      compra: {
        id: "adea68d3-ff25-4e7d-b4a3-d1de420fc9ef",
        usuarioId: "d94abff2-a6f3-4511-b8ac-8082381a949c",
        createdAt: "2024-04-26T19:45:14.626Z",
        updatedAt: "2024-04-26T19:45:14.626Z",
        compraItens: [
          {
            id: "deba9054-d702-4e46-b510-56cbf22ac7ae",
            compraId: "adea68d3-ff25-4e7d-b4a3-d1de420fc9ef",
            produtoId: "4b3c2b4c-9af2-43cf-870e-34bfdefb4d37",
            quantidade: 2,
            createdAt: "2024-04-26T19:45:14.626Z",
            updatedAt: "2024-04-26T19:45:14.626Z",
          },
        ],
      },
    },
    ChangeLangDto: {
      lang: "pt-BR",
    },
  },
};
const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];

swaggerAutogen()(outputFile, routes, doc);
