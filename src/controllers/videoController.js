import Video from "../models/Video.js";
import Categoria from "../models/Categoria.js";
import { gerarCorUnica } from "../utils/cores.js";



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

  static async listarTodosOsVideos(req, res) {
    try {
      const videos = await Video.find().populate('categoria');
      res.status(200).json(videos);
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
      const categoriaEncontradaId = await Categoria.find({ categoria: req.params.id }).populate('categoria');
        res.status(200).json(categoriaEncontradaId);
      } catch (erro) {
        res.status(500).json({ message: 'Erro ao listar vídeos por ID de categoria', erro: erro.message });
    }
  }

  static async listarVideosPorCategoria(req, res) {
    try {
      const categoriaEncontrada = await Categoria.findOne({ nome: req.params.categoria });
      if (!categoriaEncontrada) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }
      const videos = await Video.find({ categoria: categoriaEncontrada._id }).populate('categoria');
      res.status(200).json(videos)
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao listar vídeos por categoria', erro: erro.message });
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
      const atualizaVideo = await Video.findByIdAndUpdate(req.params.id, {...req.body, categoria: categoriaId},
        { new: true});
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
      res.status(204).send({ message: 'Vídeo deletado com sucesso!'});
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao deletar vídeo', erro: erro.message });
    }
  }
};

export default VideoController;