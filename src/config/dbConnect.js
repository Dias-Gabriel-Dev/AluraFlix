import mongoose from "mongoose";

async function conectaDataBase() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            dbName: 'AluraFlix',
        });
        console.log('Conexão com o banco feita com sucesso!');
    } catch (erro) {
        console.error('Erro ao conectar no banco de dados:', erro);
        process.exit(1);
    }
};

export default conectaDataBase;