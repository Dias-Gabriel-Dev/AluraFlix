import express from "express";
import { check } from 'express-validator';
import VideoController from "../controllers/videoController.js";

const router = express.Router();

const videoValidacao = [
    check('title')
    .notEmpty().withMessage('Título obrigatório!')
    .isLength({ min: 3}).withMessage('Mínimo 3 caracteres.'),check('url')
    .isURL().withMessage('URL inválida'),check('category')
    .isIn(['Educação', 'Entretenimento', 'Tecnologia']).withMessage(
    'Categoria inválida')
];

router.get("/", VideoController.ListaTodosOsVideos);
router.get('/:id', VideoController.listarVideoPorId);
router.post('/', videoValidacao, VideoController.criarVideo);
router.put('/:id', videoValidacao, VideoController.atualizarVideo);
router.delete('/:id', VideoController.deletarVideo);

export default router;