export function erroHandler(erro, req, res, next) {
  const status = erro.status || 500;
  const message = erro.message || 'Erro interno do servidor.';
  res.status(status).json({ message });
}
