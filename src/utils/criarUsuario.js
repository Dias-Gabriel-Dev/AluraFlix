import Usuario from '../models/Usuario.js';

export async function criarUsuario({ username, senha }) {
  const existente = await Usuario.findOne({ username });
  if (existente) throw new Error('Usuário já existe.');
  const usuario = new Usuario({ username, senha, role: 'aluno' });
  await usuario.save();
  return usuario;
}
