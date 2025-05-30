import Categoria from '../models/Categoria.js';
import { gerarCorUnica } from '../utils/cores.js';
import { paginacao } from '../utils/paginacao.js';

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

  static async buscarCategoria(req, res) {
    try {
      const { nome } = req.query;
      if (!nome) {
        return res
          .status(400)
          .json({ message: 'Parâmetros de busca inválido. Informe pelo menos um parâmetro.' });
      }

      const { pagina, limite, proximaPagina } = paginacao(req.query);
      const filtro = { nome: { $regex: nome, $options: 'i' } };
      const totalCategorias = await Categoria.countDocuments(filtro);
      if (totalCategorias === 0) {
        return res.status(404).json({ message: 'Nenhuma categoria encontrada.' });
      }
      const totalPaginas = Math.ceil(totalCategorias / limite);
      if (pagina > totalPaginas) {
        return res.status(404).json({ message: 'Página não encontrada', totalPaginas });
      }
      const categorias = await Categoria.find(filtro)
        .skip(proximaPagina)
        .limit(limite)
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalCategorias,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proximaPagina: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ categorias, infoPaginacao });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao buscar categoria', erro: erro.message });
    }
  }

  static async listarCategorias(req, res) {
    try {
      const { pagina, limite, proximaPagina } = paginacao(req.query);

      const totalCategorias = await Categoria.countDocuments();
      const totalPaginas = Math.ceil(totalCategorias / limite);
      if (pagina > totalPaginas && totalCategorias > 0) {
        return res.status(404).json({ message: 'Página não encontrada', totalCategorias });
      }
      const categorias = await Categoria.find()
        .skip(proximaPagina)
        .limit(limite)
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalCategorias,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proximaPagina: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ categorias, paginacao: infoPaginacao });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao listar categorias', erro: erro.message });
    }
  }

  static async listarCategoriasPorId(req, res) {
    try {
      const listaCategoriasId = await Categoria.findById(req.params.id);
      if (!listaCategoriasId) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      const { pagina, limite, proximaPagina } = paginacao(req.query);
      const filtro = { categoria: req.params.id };

      const totalCategorias = await Categoria.countDocuments(filtro);
      const totalPaginas = Math.ceil(totalCategorias / limite);
      if (pagina > totalPaginas && totalCategorias > 0) {
        return res.status(404).json({ message: 'Página não encontrada', totalPaginas });
      }
      const categorias = await Categoria.find(filtro)
        .skip(proximaPagina)
        .limit(limite)
        .populate('categoria')
        .sort({ createdAt: -1 });

      const infoPaginacao = {
        paginaAtual: pagina,
        limite,
        totalCategorias,
        paginaAnterior: pagina > 1 ? pagina - 1 : null,
        proximaPagina: pagina < totalPaginas ? pagina + 1 : null
      };
      res.status(200).json({ categorias, paginacao: infoPaginacao });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao buscar categorias', erro: erro.message });
    }
  }

  static async atualizarCategoria(req, res) {
    try {
      const atualizaCategoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
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
      res.status(200).json({ message: 'Categoria deletada com sucesso' });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao deletar categoria', erro: erro.message });
    }
  }
}

export default CategoriaController;
