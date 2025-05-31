import Video from '../models/Video.js';
import Categoria from '../models/Categoria.js';
import { gerarCorUnica } from '../utils/cores.js';
import { paginacao } from '../utils/paginacao.js';
import { semAcentoNaBusca } from '../utils/buscaSemAcento.js';

class VideoController {
  static async criarVideo(req, res) {
    try {
      let categoria;
      if (!req.body.categoria) {
        categoria = await Categoria.findOne({ nome: 'Livre' });
      } else {
        categoria = await Categoria.findOne({ nome: req.body.categoria });
        if (!categoria) {
          const cor = await gerarCorUnica();
          categoria = await Categoria.create({ nome: req.body.categoria, cor });
        }
      }
      const video = await Video.create({ ...req.body, categoria: categoria._id });
      res.status(201).json(video);
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao criar vídeo', erro: erro.message });
    }
  }

  static async buscarVideo(req, res) {
    try {
      const { titulo } = req.query;
      if (!titulo) {
        return res
          .status(400)
          .json({ message: 'Parâmetros de busca inválidos. Informe pelo menos um parâmetro.' });
      }

      const { pagina, limite, proximaPagina } = paginacao(req.query);
      const regex = semAcentoNaBusca(titulo)
      const filtro = { titulo: { $regex: regex, $options: 'i' } };
      const totalVideos = await Video.countDocuments(filtro);
      if (totalVideos === 0) {
        return res.status(404).json({ message: 'Nenhum vídeo encontrado.' });
      }
      const totalPaginas = Math.ceil(totalVideos / limite);
      if (pagina > totalPaginas) {
        return res.status(404).json({ message: 'Página não encontrada', totalPaginas });
      }
      const videos = await Video.find(filtro)
        .skip(proximaPagina)
        .limit(limite)
        .populate('categoria')
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalVideos,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proximaPagina: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ videos, infoPaginacao });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao buscar vídeo', erro: erro.message });
    }
  }

  static async listarTodosOsVideos(req, res) {
    try {
      const { pagina, limite, proximaPagina } = paginacao(req.query);

      const totalVideos = await Video.countDocuments();
      const totalPaginas = Math.ceil(totalVideos / limite);
      if (pagina > totalPaginas && totalVideos > 0) {
        return res.status(404).json({ message: 'Página não encontrada', totalPaginas });
      }
      const videos = await Video.find()
        .skip(proximaPagina)
        .limit(limite)
        .populate('categoria')
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalVideos,
        totalPaginas,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proximaPagina: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ videos, paginacao: infoPaginacao });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao listar vídeos', erro: erro.message });
    }
  }

  static async listarVideoPorId(req, res) {
    try {
      const video = await Video.findById(req.params.id).populate('categoria');
      if (!video) {
        return res.status(404).json({ message: 'Vídeo não encontrado' });
      }
      res.status(200).json(video);
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao buscar vídeo', erro: erro.message });
    }
  }

  static async listarVideosPorCategoriaId(req, res) {
    try {
      const categoriaEncontradaId = await Categoria.findById(req.params.id);
      if (!categoriaEncontradaId) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      const { pagina, limite, proximaPagina } = paginacao(req.query);
      const filtro = { categoria: req.params.id };

      const totalVideos = await Video.countDocuments(filtro);
      const totalPaginas = Math.ceil(totalVideos / limite);
      if (pagina > totalPaginas && totalVideos > 0) {
        return res.status(404).json({ message: 'Página não encontrada', totalPaginas });
      }
      const videos = await Video.find(filtro)
        .skip(proximaPagina)
        .limit(limite)
        .populate('categoria')
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalVideos,
        totalPaginas,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proximaPagina: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ videos, paginacao: infoPaginacao });
    } catch (erro) {
      res
        .status(500)
        .json({ message: 'Erro ao listar vídeos por ID de categoria', erro: erro.message });
    }
  }

  static async listarVideosPorCategoria(req, res) {
    try {
      const categoriaEncontrada = await Categoria.findOne({ nome: req.params.categoria });
      if (!categoriaEncontrada) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      const { pagina, limite, proximaPagina } = paginacao(req.query);
      const filtro = { categoria: categoriaEncontrada._id };

      const totalVideos = await Video.countDocuments(filtro);
      const totalPaginas = Math.ceil(totalVideos / limite);
      if (pagina > totalPaginas && totalVideos > 0) {
        return res.status(404).json({ message: 'Página não encontrada', totalPaginas });
      }
      const videos = await Video.find(filtro)
        .skip(proximaPagina)
        .limit(limite)
        .populate('categoria')
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalVideos,
        totalPaginas,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proximaPagina: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ videos, paginacao: infoPaginacao });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao listar vídeos por categoria', erro: erro.message });
    }
  }

  static async listarVideosGratis(req, res) {
    try {
      const { pagina, limite, proximaPagina } = paginacao(req.query);
      const filtro = { tags: 'gratuito' };

      const totalVideos = await Video.countDocuments(filtro);
      const totalPaginas = Math.ceil(totalVideos / limite);

      if (pagina > totalPaginas && totalVideos > 0) {
        return res.status(404).json({ message: 'Página não encontrada', totalPaginas });
      }
      const videos = await Video.find(filtro)
        .skip(proximaPagina)
        .limit(limite)
        .populate('categoria')
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalVideos,
        totalPaginas,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proxima: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ videos, paginacao: infoPaginacao });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao listar vídeos gratuitos', erro: erro.message });
    }
  }

  static async atualizarVideo(req, res) {
    try {
      let categoriaId = null;
      if (!req.body.categoria) {
        const categoriaLivre = await Categoria.findOne({ nome: 'Livre' });
        categoriaId = categoriaLivre._id;
      } else {
        let categoria = await Categoria.findOne({ nome: req.body.categoria });
        if (!categoria) {
          const cor = await gerarCorUnica();
          categoria = await Categoria.create({ nome: req.body.categoria, cor });
        }
        categoriaId = categoria._id;
      }
      const atualizaVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { ...req.body, categoria: categoriaId },
        { new: true }
      );
      if (!atualizaVideo) {
        return res.status(404).json({ message: 'Vídeo não encontrado' });
      }
      res.status(200).json(atualizaVideo);
    } catch (erro) {
      res.status(400).json({ message: 'Erro ao atualizar vídeo', erro: erro.message });
    }
  }

  static async deletarVideo(req, res) {
    try {
      const videoDeletado = await Video.findByIdAndDelete(req.params.id);
      if (!videoDeletado) {
        return res.status(404).json({ message: 'Vídeo não encontrado' });
      }
      res.status(200).json({ message: 'Vídeo deletado com sucesso' });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao deletar vídeo', erro: erro.message });
    }
  }
}

export default VideoController;
