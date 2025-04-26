import Video from "../models/Video.js";

class VideoController {

  static async criarVideo(req, res) {
      try {
        const novoVideo = await Video.create(req.body);
        res.status(201).json({message: 'Vídeo postado com sucesso', video: novoVideo});
      } catch (erro) {
        res.status(400).json({ erro: erro.message });
      }
  }

  static async ListaTodosOsVideos(req, res) {
      try {
        const videos = await Video.find();
        res.json(videos);
      } catch (erro) {
        res.status(500).json({ erro: 'Erro interno do servidor'});
      }
  }

  static async listarVideoPorId(req, res) {
      try {
        const id = req.params.id;
        const videoEncontrado = await Video.findById(id);
        res.status(201).json(videoEncontrado);
      } catch (error) {
        res.status(500).json({ message: 'Vídeo não encontrado'})
    }
  }

  static async atualizarVideo(req, res) {
      try {
        const videoAtualizado = await Video.findByIdAndUpdate(req.params.id, req.body,
          { new: true, runValidators: true }
        );
        if (!videoAtualizado) {
          return res.status(404).json({ message: 'Vídeo não encontrado'});
        }
        res.status(201).json({ message: 'Vídeo atualizado com sucesso', video: videoAtualizado})
      } catch (erro) {
          res.status(400).json({ erro: erro.message })
      }
  }

  static async deletarVideo(req, res) {
      try {
        const videoDeletado = await Video.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Vídeo removido com sucesso!', video: videoDeletado })
      } catch (error) {
        res.status(400).json({ erro: 'Não foi possível remover o vídeo' });
      }
  };
}

export default VideoController;