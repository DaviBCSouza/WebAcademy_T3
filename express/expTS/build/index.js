'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const express_1 = __importDefault(require('express'));
const express_handlebars_1 = require('express-handlebars');
const node_sass_middleware_1 = __importDefault(require('node-sass-middleware'));
const loggers_1 = __importDefault(require('./middlewares/loggers'));
const router_1 = __importDefault(require('./router/router'));
const validateEnv_1 = __importDefault(require('./utils/validateEnv'));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 5000;
app.use((0, loggers_1.default)('completo'));
app.engine(
  'handlebars',
  (0, express_handlebars_1.engine)({
    helpers: require(`${__dirname}/views/helpers/helpers.js`),
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/main`);
app.use('/html', express_1.default.static(`${__dirname}/../public/html`));
app.use('/css', express_1.default.static(`${__dirname}/../public/css`));
app.use('/js', express_1.default.static(`${__dirname}/../public/js`));
app.use('/img', express_1.default.static(`${__dirname}/../public/img`));
app.use(
  (0, node_sass_middleware_1.default)({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: 'compressed',
    prefix: '/css'
  })
);
app.use(router_1.default);
app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
