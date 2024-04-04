import { cleanEnv, port, str, url } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    URL_DB: url()
  });
};

export default validateEnv;
