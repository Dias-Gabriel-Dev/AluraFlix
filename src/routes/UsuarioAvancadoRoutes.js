import express from 'express';
import { criarUsuarioAvancado } from '../controllers/authController.js';
import { autenticarJWT } from '../middlewares/auth.js';
import { roleAutorizada } from '../middlewares/roleAutorizada.js';

const routes = express.Router();

routes.post('/usuarios/avancado', autenticarJWT, roleAutorizada('admin'), criarUsuarioAvancado);


export default routes;