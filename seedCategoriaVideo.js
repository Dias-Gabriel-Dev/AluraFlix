import mongoose from 'mongoose';
import Categoria from './src/models/Categoria.js';
import Video from './src/models/Video.js';
import conectaDataBase from './src/config/dbConnect.js';
import { gerarCorUnica } from './src/utils/cores.js';
import 'dotenv/config';

async function seedCategoriasVideos() {
  try {
    await conectaDataBase();

    // Esvazia as coleções
    await mongoose.connection.db.collection('videos').deleteMany({});
    await mongoose.connection.db.collection('categorias').deleteMany({});

    // Garante a existência da categoria Livre
    let categoriaLivre = await Categoria.findOne({ nome: 'Livre' });
    if (!categoriaLivre) {
      categoriaLivre = await Categoria.create({ nome: 'Livre', cor: '#000000' });
    }

    // Nomes das demais categorias (cores automáticas)
    const nomesCategorias = ['Back-end', 'Front-end', 'DevOps'];
    const categoriasCriadas = [];

    for (const nome of nomesCategorias) {
      const cor = await gerarCorUnica();
      const categoria = await Categoria.create({ nome, cor });
      categoriasCriadas.push(categoria);
    }
    // Inclui a categoria Livre na lista para facilitar sorteio de vídeos gratuitos
    categoriasCriadas.push(categoriaLivre);

    // Gera 10 vídeos para cada categoria (exceto "Livre")
    const todosVideos = [];
    for (const categoria of categoriasCriadas) {
      for (let i = 1; i <= 10; i++) {
        // Para metade dos vídeos de cada categoria, envie categoria vazia para cair em "Livre"
        if (categoria.nome === 'Livre') continue; // Não criar vídeos explicitamente para "Livre" aqui
        const payload = {
          titulo: `Vídeo ${i} de ${categoria.nome}`,
          descricao: `Descrição do vídeo ${i} da categoria ${categoria.nome}`,
          url: `https://meusvideos.com/${categoria.nome.toLowerCase().replace(/ /g, '')}${i}`,
          categoria: i % 2 === 0 ? '' : categoria.nome, // Se par, envia vazio (vai para Livre)
          tags: []
        };
        todosVideos.push(payload);
      }
    }

    // Após criar todos os payloads, sorteie 10 vídeos para receber a tag 'gratuito'
    const indicesSorteados = [];
    while (indicesSorteados.length < 10) {
      const idx = Math.floor(Math.random() * todosVideos.length);
      if (!indicesSorteados.includes(idx)) indicesSorteados.push(idx);
    }
    for (const idx of indicesSorteados) {
      todosVideos[idx].tags.push('gratuito');
    }

    // Agora simule o comportamento do endpoint: para cada vídeo, resolva a categoria como o controller faz
    for (const videoPayload of todosVideos) {
      let categoria;
      if (!videoPayload.categoria) {
        categoria = categoriaLivre;
      } else {
        categoria = await Categoria.findOne({ nome: videoPayload.categoria });
      }
      await Video.create({
        ...videoPayload,
        categoria: categoria._id
      });
    }

    console.log('Total de vídeos criados:', todosVideos.length);
    console.log(
      'Total de vídeos gratuitos:',
      todosVideos.filter((v) => v.tags.includes('gratuito')).length
    );

    await mongoose.connection.close();
    console.log('Seed concluído com sucesso!');
  } catch (erro) {
    console.error('Erro ao executar seed:', erro);
    process.exit(1);
  }
}

seedCategoriasVideos();
