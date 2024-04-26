import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

import setCookieLang from "./middlewares/setCookieLang";
import router from "./router";
import validateEnv from "./utils/validateEnv";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5000;

declare module "express-session" {
  interface SessionData {
    uid: string;
    tipoUsuario: string;
    carrinho: { [produtoId: string]: number };
  }
}

app.use(
  session({
    genid: (req) => uuidv4(),
    secret: "Hi9Cf#mK98",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(setCookieLang);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Aplicação Rodando em http://localhost:${PORT}`);
});
