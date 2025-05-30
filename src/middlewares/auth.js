import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function autenticarJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Não autorizado' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (erro, usuario) => {
    if (erro) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    req.usuario = usuario;
    next();
  });
}
