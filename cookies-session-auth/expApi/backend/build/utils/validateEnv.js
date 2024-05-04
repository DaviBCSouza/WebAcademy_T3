"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
// Função para validar o arquivo .env
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        PORT: (0, envalid_1.port)(),
        HOST: (0, envalid_1.str)(),
        NODE_ENV: (0, envalid_1.str)(),
        DB_PASSWORD: (0, envalid_1.str)(),
        DEFAULT_LANG: (0, envalid_1.str)(),
        BCRYPT_ROUNDS: (0, envalid_1.num)(),
    });
}
exports.default = validateEnv;
