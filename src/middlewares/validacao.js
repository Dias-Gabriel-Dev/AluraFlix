import { check } from "express-validator";


const categoriaCor = {
    'Educação': 'red',
    'Entretenimento': 'green',
    'Tecnologia': 'yellow',
    'Informativo': 'blue'
}
const categorias = ['Educação', 'Entretenimento', 'Tecnologia', 'Informativo']

export const videoValidacao = [
    check('title')
    .notEmpty().withMessage('Título obrigatório!')
    .isLength({ min: 3}).withMessage('Mínimo 3 caracteres.'),check('url')
    .isURL().withMessage('URL inválida'),check('category')
    .isIn(categorias).withMessage('Categoria inválida'),check('cor')
    .custom((value, { req }) => {
        const categoria = req.body.categoria;
        if (categoriaCor[categoria] !== value) {
            throw new Error(`A cor da categoria "${categoria}" deve ser 
            "${categoriaCor[categoria]}"`);
        }
    })
    .isIn(cor).withMessage(`São permitidas apenas as cores: ${cor.join(', ')}`)
];