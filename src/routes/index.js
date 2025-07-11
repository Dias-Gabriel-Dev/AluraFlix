import express from 'express';
import videos from './videoRoutes.js';
import categorias from './categoriaRoutes.js';
import usuariosRoutes from './usuariosRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'AluraFlix' });
  });

  app.use(express.json());
  app.use(usuariosRoutes);
  app.use(videos);
  app.use(categorias);
};

export default routes;
