import Video from "../models/Video.js";

export const criarVideo = async (req, res) => {
    try {
      const novoVideo = await Video.create(req.body);
      res.status(201).json('Vídeo postado com sucesso',novoVideo);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
};

export const ListaTodosOsVideos = async (req, res) => {
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro interno do servidor'});
    }
};

export const atualizarVideo = async (req, res) => {
    try {
       const video = await Video.findByIdAndUpdate(req.params.id, req.body,
        { new: true }
       );
       video ? res.json('Atualizações feitas com sucesso!' ,video) : res.status(404).json({ erro: 'Vídeo não encontrado.'});
    } catch (erro) {
        res.status(400).json({ erro: erro.message })
    }
};

export const deletarVideo = async (req, res) => {
    try {
       const video = await Video.findByIdAndDelete(req.params.id);
       video ? res.status(204).json('Vídeo removido com sucesso!') : res.status(404).json({ erro: 'Vídeo não encontrado'});
    } catch (error) {
       res.status(400).json({ erro: 'Não foi possível remover o vídeo' });
    }
};