import { body, validationResult } from 'express-validator';

export const usuarioUpdateValidacao = [
  body('username').optional().notEmpty().withMessage('Username não pode ser vazio.'),
  body('senhaAtual').notEmpty().withMessage('É necessário informar a senha atual.'),
  body('novasenha').optional().notEmpty().withMessage('Nova senha não pode ser vazia'),
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  }
];
