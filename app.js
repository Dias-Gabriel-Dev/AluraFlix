import express from 'express';
import conectaDataBase from './src/config/dbConnect.js';
import routes from './src/routes/index.js';

conectaDataBase();

const app = express();

app.use(express.json())
routes(app);

export default app;

