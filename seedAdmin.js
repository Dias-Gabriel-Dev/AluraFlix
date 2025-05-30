import mongoose from 'mongoose';
import Usuario from './src/models/Usuario.js';
import conectaDataBase from './src/config/dbConnect.js';
import 'dotenv/config';

async function seedAdmin() {
  try {
    // Conecta ao banco
    await conectaDataBase(); // <--- Chamada correta da função

    // Apaga todos os usuários
    await mongoose.connection.db.collection('usuarios').deleteMany({});

    // Cria o admin
    const adminUser = new Usuario({
      username: 'admin',
      senha: 'admin', // Senha em texto puro (o pre('save') faz o hash)
      role: 'admin',
      ativo: true
    });

    await adminUser.save();
    console.log('Usuário admin criado com sucesso!');
    console.log('Username: admin');
    console.log('Senha: admin');

    await mongoose.connection.close();
  } catch (erro) {
    console.error('Erro ao executar seed:', erro);
    process.exit(1);
  }
}

seedAdmin();
