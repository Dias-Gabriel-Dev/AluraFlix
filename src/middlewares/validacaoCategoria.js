import { body, validationResult } from 'express-validator';

export const categoriaValidacao = [
  body('nome').notEmpty().withMessage('Nome obrigatório.'),
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  }
];
