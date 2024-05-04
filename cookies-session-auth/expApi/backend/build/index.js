"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const uuid_1 = require("uuid");
const swagger_output_json_1 = __importDefault(require("./swagger/swagger-output.json"));
const setCookieLang_1 = __importDefault(require("./middlewares/setCookieLang"));
const router_1 = __importDefault(require("./router"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 5000;
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    genid: () => (0, uuid_1.v4)(),
    secret: "StMf#She#mj34se#dSm",
    resave: true,
    saveUninitialized: true,
}));
app.use(setCookieLang_1.default);
app.use(express_1.default.json());
app.use(router_1.default);
app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.listen(PORT, () => {
    console.log(`Aplicação Rodando em http://localhost:${PORT}`);
});
