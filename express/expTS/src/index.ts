import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import logger from './middlewares/loggers';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(logger('completo'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
