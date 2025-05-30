import { body, validationResult } from 'express-validator';

export const usuarioValidacao = [
  body('username').notEmpty().withMessage('Username obrigatório.'),
  body('senha').notEmpty().withMessage('Senha obrigatória.'),
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  }
];
