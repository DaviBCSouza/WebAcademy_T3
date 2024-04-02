import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';

async function saveLogs(filename: string, logs: string) {
  const logsPath = process.env.FOLDER_LOGS!;

  try {
    await fs.access(logsPath);
  } catch (err) {
    await fs.mkdir(logsPath);
  }

  try {
    await fs.appendFile(`${logsPath}/${filename}`, logs);
  } catch (err) {
    if (err) throw new Error(err.toString());
  }
}

function logger(formato: 'simples' | 'completo') {
  if (formato === 'simples') {
    return async (req: Request, res: Response, next: NextFunction) => {
      const log = `${new Date().toISOString()} ${req.url} ${req.method}\n`;
      await saveLogs(`${formato}.log`, log);
      next();
    };
  } else if (formato === 'completo') {
    return async (req: Request, res: Response, next: NextFunction) => {
      const log = `${new Date().toISOString()} ${req.url} ${req.method}
      ${req.httpVersion} ${req.get('User-Agent')}\n`;
      await saveLogs(`${formato}.log`, log);
      next();
    };
  } else {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log('Formato Inválido!');
      next();
    };
  }
}

export default logger;
