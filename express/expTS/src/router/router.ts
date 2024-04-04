import { Router } from 'express';
import mainController from '../controllers/main';
import produtoController from '../controllers/produto';

const router = Router();

// Main Controller
router.get('/', mainController.index);
router.get('/lorem/:paragraphs', mainController.lorem);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb3-1', mainController.hb3_1);
router.get('/hb4', mainController.hb4);

// Produto Controller
router.get('/produto', produtoController.index);
router.get('/produto/create', produtoController.create);
router.post('/produto/create', produtoController.create);
router.get('/produto/update/:id', produtoController.update);
router.post('/produto/update/:id', produtoController.update);
router.get('/produto/:id', produtoController.read);
router.get('/produto/remove/:id', produtoController.remove);

router.use(mainController.erro);

export default router;
