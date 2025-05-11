import 'dotenv/config';
import express from 'express';
import conectaDataBase from './src/config/dbConnect.js';
import routes from './src/routes/index.js';
import seedCategoriaLivre  from './src/seeders/categoriaLivre.js';

conectaDataBase().then(() => {
    seedCategoriaLivre();
});

const app = express();
app.use(express.json())
routes(app);

export default app;

