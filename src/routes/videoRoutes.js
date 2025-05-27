import express from "express";
import { videoValidacao } from "../middlewares/validacao.js";
import VideoController from "../controllers/videoController.js";
import { login, registrar } from "../controllers/authController.js";
import { autenticarJWT } from "../middlewares/auth.js";
import { roleAutorizada } from "../middlewares/roleAutorizada.js";

const routes = express.Router();

routes.post('/login', login);
routes.post('/cadastro', registrar);
routes.get('/videos/gratis', VideoController.listarVideosGratis);

routes.use(autenticarJWT);

routes.get('/videos/busca', VideoController.buscarVideo);
routes.get('/videos/:id', VideoController.listarVideoPorId);
routes.get('/videos', VideoController.listarTodosOsVideos);
routes.get('/videos/categorias/id/:id', VideoController.listarVideosPorCategoriaId);
routes.get('/videos/categorias/nome/:categoria', VideoController.listarVideosPorCategoria);
routes.post('/videos', roleAutorizada('admin', 'docente'), videoValidacao, VideoController.criarVideo);
routes.put('/videos/:id', roleAutorizada('admin', 'docente'), videoValidacao, VideoController.atualizarVideo);
routes.delete('/videos/:id', roleAutorizada('admin'), VideoController.deletarVideo);

export default routes;
