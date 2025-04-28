import { categoria } from '../models/Categoria.js';

class CategoriaController {

  static async listarCategorias (req, res) {
    try {
      const listacategorias = await categoria.find({});
      res.status(200).json(listacategorias);
    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - Não foi possível obter a lista de categorias`});
    }
  };

  static async listarCategoriasPorId (req, res) {
    try {
      const id = req.params.id;
      const categoriaEncontrada = await categoria.findById(id);
      res.status(200).json(categoriaEncontrada);
    } catch (erro) {
       res.status(500).json({ message: `${erro.message} - Id ou categoria não existente`}) 
    }
  }
};

export default CategoriaController;
