import dotenv from "dotenv";
import express from "express";

import router from "./router";
import validateEnv from "./utils/validateEnv";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Aplicação Rodando em http://localhost:${PORT}`);
});
