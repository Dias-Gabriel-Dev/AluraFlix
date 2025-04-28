import express from 'express';
import CategoriaController from '../controllers/categoriaContoller.js';

const routes = express.Router();

routes.get('/categorias', CategoriaController.listarCategorias);;
routes.get('/categorias/:id', CategoriaController.listarCategoriasPorId);

export default routes;