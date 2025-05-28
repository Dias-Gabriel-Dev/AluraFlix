import express from 'express';
import CategoriaController from '../controllers/categoriaController.js';
import { login } from '../controllers/authController.js';
import { autenticarJWT } from '../middlewares/auth.js';
import { roleAutorizada } from '../middlewares/roleAutorizada.js';

const routes = express.Router();

routes.post('/login', login);

routes.use(autenticarJWT);

routes.get('/categorias/busca', CategoriaController.buscarCategoria);
routes.get('/categorias/:id', CategoriaController.listarCategoriasPorId);
routes.get('/categorias', CategoriaController.listarCategorias);
routes.post('/categorias', roleAutorizada('admin', 'docente'), CategoriaController.criarCategoria);
routes.put('/categorias/:id', roleAutorizada('admin', 'docente'), CategoriaController.atualizarCategoria);
routes.delete('/categorias/:id', roleAutorizada('admin'), CategoriaController.deletarCategoria);

export default routes;
