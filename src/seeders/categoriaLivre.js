import  Categoria  from "../models/Categoria.js";

const seedCategoriaLivre = async() => {
    const livre = await Categoria.findOne({ nome : 'Livre' });
    if (!livre) {
        await Categoria.create({ nome: 'Livre', cor: '#000000'});
    }
};

export default seedCategoriaLivre;