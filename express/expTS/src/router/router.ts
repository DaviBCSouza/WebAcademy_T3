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

router.use((req: Request, res: Response) => {
  res.status(404).send('Error 404!');
});

export default router;
