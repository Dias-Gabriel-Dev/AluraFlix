import { Router } from 'express';
import { check } from 'express-validator';
import { criarVideo,
    ListaTodosOsVideos,
    atualizarVideo,
    deletarVideo } from '../controllers/videoController.js';

const router = Router();

const videoValidacao = [
    check('title')
    .notEmpty().withMessage('Título obrigatório!')
    .isLength({ min: 3}).withMessage('Mínimo 3 caracteres.'),check('url')
    .isURL().withMessage('URL inválida'),check('category')
    .isIn(['Educação', 'Entretenimento', 'Tecnologia']).withMessage(
    'Categoria inválida')
];

router.get('/', ListaTodosOsVideos);
router.post('/', videoValidacao, criarVideo);
router.put('/:id', videoValidacao, atualizarVideo);
router.delete('/:id', deletarVideo);

export default router;