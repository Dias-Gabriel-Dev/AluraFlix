import express from 'express';
import videos from './videoRoutes.js';


const routes = (app) => {
    app.route('').get((req, res) => {
        res.status(200).send({ titulo: 'AluraFlix' });
    });

    app.use('/videos', videos)
}

export default routes;