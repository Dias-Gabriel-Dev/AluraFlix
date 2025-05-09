import express from "express";
import { videoValidacao } from "../middlewares/validacao.js";
import VideoController from "../controllers/videoController.js";

const routes = express.Router();

routes.get('/videos', VideoController.listarTodosOsVideos);
routes.get('/videos/:id', VideoController.listarVideoPorId);
routes.get('/videos/categorias/id/:id', VideoController.listarVideosPorCategoriaId);
routes.get('/videos/categorias/nome/:categoria', VideoController.listarVideosPorCategoria);
routes.post('/videos', videoValidacao, VideoController.criarVideo);
routes.put('/videos/:id', videoValidacao, VideoController.atualizarVideo);
routes.delete('/videos/:id', VideoController.deletarVideo);

export default routes;
