import mongoose from "mongoose";

async function conectaDataBase() {
    try {
        await mongoose.connect(process.env.DB_connection_STRING || 'mongodb://127.0.0.1:27017/aluraflix');
        console.log('Conexão com o banco estabelecida');
    } catch (erro) {
        console.error('Erro fatal na conexão/seeding', erro);
        process.exit(1);
    }
};

export default conectaDataBase;