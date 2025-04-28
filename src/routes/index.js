import express from 'express';
import videos from './videoRoutes.js';
import { categorias }  from '../models/Categoria.js';


const routes = (app) => {
    app.route('').get((req, res) => {
        res.status(200).send({ titulo: 'AluraFlix' });
    });

    app.use(express.json(), videos, categorias)
}

export default routes;