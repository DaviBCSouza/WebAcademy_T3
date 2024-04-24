import { cleanEnv, port, str } from "envalid";

// Função para validar o arquivo .env
function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
  });
}

export default validateEnv;
