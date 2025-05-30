import express from 'express';
import CategoriaController from '../controllers/categoriaController.js';
import { autenticarJWT } from '../middlewares/auth.js';
import { roleAutorizada } from '../middlewares/roleAutorizada.js';
import UsuarioController from '../controllers/usuarioController.js';
import { categoriaValidacao } from '../middlewares/validacaoCategoria.js';
import { usuarioValidacao } from '../middlewares/validacaoUsuario.js';

const routes = express.Router();

routes.use(autenticarJWT);

routes.get('/categorias/busca', CategoriaController.buscarCategoria);
routes.get('/categorias/:id', CategoriaController.listarCategoriasPorId);
routes.get('/categorias', CategoriaController.listarCategorias);
routes.post(
  '/categorias',
  roleAutorizada('admin', 'docente'),
  categoriaValidacao,
  CategoriaController.criarCategoria
);
routes.put(
  '/categorias/:id',
  roleAutorizada('admin', 'docente'),
  categoriaValidacao,
  CategoriaController.atualizarCategoria
);
routes.delete('/categorias/:id', roleAutorizada('admin'), CategoriaController.deletarCategoria);

export default routes;
