import { check } from "express-validator";

const categorias = ['Educação', 'Entretenimento', 'Tecnologia'];

export const videoValidacao = [
    check('title')
    .notEmpty().withMessage('Título obrigatório!')
    .isLength({ min: 3}).withMessage('Mínimo 3 caracteres.'),check('url')
    .isURL().withMessage('URL inválida'),check('category')
    .isIn(categorias).withMessage('Categoria inválida')
];