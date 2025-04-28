import express from "express";
import { videoValidacao } from "../middlewares/validacao.js";
import VideoController from "../controllers/videoController.js";

const routes = express.Router();

routes.get('/', VideoController.ListaTodosOsVideos);
routes.get('/:id', VideoController.listarVideoPorId);
routes.post('/', videoValidacao, VideoController.criarVideo);
routes.put('/:id', videoValidacao, VideoController.atualizarVideo);
routes.delete('/:id', VideoController.deletarVideo);

export default routes;