import { cleanEnv, num, port, str } from "envalid";

// Função para validar o arquivo .env
function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    HOST: str(),
    NODE_ENV: str(),
    DB_PASSWORD: str(),
    DEFAULT_LANG: str(),
    BCRYPT_ROUNDS: num(),
  });
}

export default validateEnv;
