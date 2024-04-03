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

router.get('/hb3-1', (req: Request, res: Response) => {
  const professores = [
    { name: 'David Fernandes', classroom: 1238 },
    { name: 'Horácio Fernandes', classroom: 1233 },
    { name: 'Edleno Moura', classroom: 1236 },
    { name: 'Elaine Harada', classroom: 1231 }
  ];
  res.render('hb3-1', {
    setor: 'Professores do ICOMP',
    professores,
    layout: false
  });
});

router.get('/hb4', (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true }
  ];
  res.render('hb4', {
    title: 'Tecnologias baseadas no NodeJS:',
    technologies,
    layout: false
  });
});

router.use((req: Request, res: Response) => {
  res.status(404).send('Error 404: Nada encontrado!');
});

export default router;
