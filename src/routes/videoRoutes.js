import express from "express";
import { videoValidacao } from "../middlewares/validacaoVideos.js";
import VideoController from "../controllers/videoController.js";

const router = express.Router();

router.get('/', VideoController.ListaTodosOsVideos);
router.get('/:id', VideoController.listarVideoPorId);
router.post('/', videoValidacao, VideoController.criarVideo);
router.put('/:id', videoValidacao, VideoController.atualizarVideo);
router.delete('/:id', VideoController.deletarVideo);

export default router;