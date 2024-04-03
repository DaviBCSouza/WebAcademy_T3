import { Request, Response, Router } from 'express';
import { loremIpsum } from 'lorem-ipsum';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

router.get('/lorem/:paragraphs', (req: Request, res: Response) => {
  const { paragraphs } = req.params;
  const loremText = loremIpsum({
    count: parseInt(paragraphs),
    units: 'paragraphs',
    format: 'html'
  });
  res.send(loremText);
});

router.get('/hb1', (req: Request, res: Response) => {
  res.render('hb1', {
    mensagem: 'Hello World with the Handlebars!',
    layout: false
  });
});

router.get('/hb2', (req: Request, res: Response) => {
  res.render('hb2', {
    poweredByExpress: true,
    name: 'Express',
    type: 'Framework',
    layout: false
  });
});

router.get('/hb3', (req: Request, res: Response) => {
  res.render('hb3', {
    setor: 'Professores do ICOMP',
    professores: [
      { nome: 'David Fernandes', sala: 1238 },
      { nome: 'Horácio Fernandes', sala: 1233 },
      { nome: 'Edleno Moura', sala: 1236 },
      { nome: 'Elaine Harada', sala: 1231 }
    ],
    layout: false
  });
});

router.use((req: Request, res: Response) => {
  res.status(404).send('Error 404!');
});

export default router;
