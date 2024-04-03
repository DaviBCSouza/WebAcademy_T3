import dotenv from 'dotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import logger from './middlewares/loggers';
import router from './router/router';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(logger('completo'));

app.engine(
  'handlebars',
  engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
  })
);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/main`);

app.use(router);

app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
