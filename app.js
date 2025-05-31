import 'dotenv/config';
import express from 'express';
import conectaDataBase from './src/config/dbConnect.js';
import routes from './src/routes/index.js';
import seedCategoriaLivre from './src/seeders/categoriaLivre.js';
import { erroHandler } from './src/middlewares/errorHandler.js';

conectaDataBase().then(() => {
  seedCategoriaLivre();
});

const app = express();
app.use(express.json());
app.use(erroHandler);
routes(app);

export default app;
