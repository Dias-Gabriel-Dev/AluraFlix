import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import conectaDataBase from './src/config/dbConnect.js';
import cors from 'cors';
import routes from './src/routes/index.js';


conectaDataBase();

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}!`);
});

