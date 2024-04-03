import dotenv from 'dotenv';
import express from 'express';
import logger from './middlewares/loggers';
import router from './router/router';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(logger('completo'));

app.use(router);

app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
