import Categoria from "../models/Categoria.js";

const CORES_RESERVADAS = ['#000000'];

function gerarCorAleatoria() {
    let cor;
    do { cor = '#' + Math.floor(Math.random()* 167772155).toString(16).padStart(6, '0');
    } while (CORES_RESERVADAS.includes(cor));
    return cor;
}

export async function gerarCorUnica() {
    const categorias = await Categoria.find({}, 'cor');
    const usadas = categorias.map(cat => cat.cor.toLowerCase());
    let cor;
    do {
        cor = gerarCorAleatoria();
    } while (usadas.includes(cor.toLocaleLowerCase()));
    return cor;
}