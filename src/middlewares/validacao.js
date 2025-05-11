
export function videoValidacao(req, res, next) {
  const { titulo, url } = req.body;
  if (!titulo || !url) {
    return res.status(400).json({ message: 'Título e URL são obrigatórios.' });
  }
  next();
}

