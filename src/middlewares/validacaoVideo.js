import { body, validationResult } from 'express-validator';

export const videoValidacao = [
  body('titulo').notEmpty().withMessage('Título obrigatório'),
  body('url').notEmpty().withMessage('URL é obrigatória.'),
  body('tags').optional().isArray().withMessage('Tags deve ser um array.'),
  body('tags.*').optional().isIn(['gratuito']).withMessage('Tag inválida.'),
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const camposPermitidos = ['titulo', 'descricao', 'url', 'categoria', 'tags'];
    const camposEnviados = Object.keys(req.body);
    const camposInvalidos = camposEnviados.filter((campo) => !camposPermitidos.includes(campo));
    if (camposInvalidos.length > 0) {
      return res
        .status(400)
        .json({ message: `Campos não permitidos: ${camposInvalidos.join(', ')}` });
    }
    next();
  }
];
