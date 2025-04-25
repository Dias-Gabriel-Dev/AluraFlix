import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import videosRoutes from './routes/videoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de conexão', err));

app.use('/videos', videosRoutes);

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ error: 'Algo deu errado!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

  

