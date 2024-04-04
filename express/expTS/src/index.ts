import dotenv from 'dotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import sass from 'node-sass-middleware';
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
    helpers: require(`${__dirname}/views/helpers/helpers.ts`),
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/main`);

app.use('/html', express.static(`${__dirname}/../public/html`));
app.use('/css', express.static(`${__dirname}/../public/css`));
app.use('/js', [
  express.static(`${__dirname}/../public/js`),
  express.static(`${__dirname}/../node_modules/bootstrap/dist/js`)
]);
app.use('/img', express.static(`${__dirname}/../public/img`));
app.use(
  sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: 'compressed',
    prefix: '/css'
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
