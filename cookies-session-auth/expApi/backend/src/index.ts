import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import { v4 as uuidv4 } from "uuid";
import swaggerFile from "./swagger/swagger-output.json";

import setCookieLang from "./middlewares/setCookieLang";
import router from "./router";
import validateEnv from "./utils/validateEnv";

declare module "express-session" {
  interface SessionData {
    uid: string;
    tipoUsuarioId: string;
    carrinho: { [produtoId: string]: number };
  }
}

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: "StMf#She#mj34se#dSm",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(setCookieLang);
app.use(express.json());
app.use(router);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Aplicação Rodando em http://localhost:${PORT}`);
});
