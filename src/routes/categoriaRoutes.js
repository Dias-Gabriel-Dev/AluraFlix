import express from 'express';
import CategoriaController from '../controllers/categoriaController.js';

const routes = express.Router();

routes.get('/categorias', CategoriaController.listarCategorias);
routes.get('/categorias/:id', CategoriaController.listarCategoriasPorId);
routes.post('/categorias', CategoriaController.criarCategoria);
routes.put('/categorias/:id', CategoriaController.atualizarCategoria);
routes.delete('/categorias/:id', CategoriaController.deletarCategoria);

export default routes;
