import dotenv from "dotenv";
import express from "express";
import router from "./routers/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
