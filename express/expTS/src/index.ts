import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
