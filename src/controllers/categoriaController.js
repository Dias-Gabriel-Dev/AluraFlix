import  Categoria  from '../models/Categoria.js';
import { gerarCorUnica } from '../utils/cores.js'

class CategoriaController {
  
  static async criarCategoria(req, res) {
    try {
      const cor = await gerarCorUnica();
      const categoria = await Categoria.create({ nome: req.body.nome, cor });
      res.status(201).json(categoria);
    } catch (erro) {
      res.status(400).json({ message: 'Erro ao criar categoria', erro: erro.message });
    }
  }

  static async listarCategorias(req, res) {
    try {
      const listaCategorias = await Categoria.find();
        res.status(200).json(listaCategorias);
      } catch (erro) {
        res.status(500).json({ message: 'Erro ao listar categorias', erro: erro.message });
    }
  }

  static async listarCategoriasPorId(req, res) {
    try {
      const listaCategoriasPorId = await Categoria.findById(req.params.id);
      if (!listaCategoriasPorId) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }
      res.status(200).json(listaCategoriasPorId);
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao buscar categorias', erro: erro.message });
    }
  }

  static async atualizarCategoria(req, res) {
    try {
      const atualizaCategoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!atualizaCategoria) {
        return res.status(404).json({ message: 'Categoria não encontarda' });
      }
      res.status(200).json(atualizaCategoria);
    } catch (erro) {
      res.status(400).json({ message: 'Erro ao atualizar categoria', erro: erro.message });
    }
  }

  static async deletarCategoria(req, res) {
    try {
      const deletaCategoria = await Categoria.findByIdAndDelete(req.params.id);
      if (!deletaCategoria) {
        return res.status(404).json({ message: 'Categoria não encontada' });
      }
      res.status(200).json({ message: 'Categoria deletada com sucesso'});
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao deletar categoria', erro: erro.message });
    }
  }
};

export default CategoriaController;
