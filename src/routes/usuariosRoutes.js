import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import { autenticarJWT } from '../middlewares/auth.js';
import { roleAutorizada } from '../middlewares/roleAutorizada.js';
import { usuarioValidacao } from '../middlewares/validacaoUsuario.js';

const routes = express.Router();

routes.post('/cadastro', usuarioValidacao, UsuarioController.cadastrar);
routes.post('/login', UsuarioController.login);

routes.get('/usuarios', autenticarJWT, roleAutorizada('admin'), UsuarioController.listarUsuarios);
routes.post(
  '/usuarios/avancado',
  autenticarJWT,
  roleAutorizada('admin'),
  usuarioValidacao,
  UsuarioController.criarUsuarioAvancado
);
routes.put('/usuarios/:id', autenticarJWT, usuarioValidacao, UsuarioController.atualizarUsuario);
routes.patch('/usuarios/:id/inativar', autenticarJWT, UsuarioController.inativarUsuario);

export default routes;
