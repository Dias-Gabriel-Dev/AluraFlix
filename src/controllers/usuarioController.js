import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { username, senha } = req.body;
      const existente = await Usuario.findOne({ username });
      if (existente) return res.status(400).json({ message: 'Usuário já existe.' });
      const usuario = new Usuario({ username, senha, role: 'aluno' });
      await usuario.save();
      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, senha } = req.body;
      const usuario = await Usuario.findOne({ username, ativo: true });
      if (!usuario) return res.status(401).json({ message: 'Usuário e senha inválido' });
      if (!usuario.ativo) {
        return res.status(401).json({
          message: 'Usuário inativado, por favor entre em contato com um de nossos colaboradores.'
        });
      }
      const senhaCorreta = await usuario.compararSenha(senha);
      if (!senhaCorreta) return res.status(401).json({ message: 'Usuário e senha inválido' });
      const token = jwt.sign(
        { id: usuario._id, username: usuario.username, role: usuario.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  static async criarUsuarioAvancado(req, res) {
    try {
      const { username, senha, role } = req.body;
      if (!['admin', 'docente'].includes(role))
        return res.status(400).json({ message: 'Role inválida para este endpoint.' });
      const existente = await Usuario.findOne({ username });
      if (existente) return res.status(400).json({ message: 'Usuário já existe.' });
      const usuario = new Usuario({ username, senha, role });
      await usuario.save();
      res.status(201).json({ message: 'Usuário criado com sucesso!', usuario });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  static async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { username, senhaAtual, novaSenha, ...outrosDados } = req.body;
      if (req.usuario.role !== 'admin' && req.usuario.id !== id)
        return res.status(403).json({ message: 'Acesso negado.' });
      const usuario = await Usuario.findById(id);
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });

      if (novaSenha) {
        if (!senhaAtual)
          return res.status(400).json({ message: 'Informe a senha atual para trocar a senha.' });
        const senhaConfere = await bcrypt.compare(senhaAtual, usuario.senha);
        if (!senhaConfere) return res.status(400).json({ message: 'Senha atual incorreta.' });
        usuario.senha = novaSenha;
      }
      if (username) usuario.username = username;
      Object.assign(usuario, outrosDados);
      await usuario.save();
      res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  static async inativarUsuario(req, res) {
    try {
      const { id } = req.params;
      if (req.usuario.role !== 'admin' && req.usuario.id !== id)
        return res.status(403).json({ message: 'Acesso negado.' });
      const usuario = await Usuario.findById(id);
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });
      usuario.ativo = false;
      await usuario.save();
      res.status(200).json({ message: 'Usuário inativado com sucesso.' });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  static async reativarUsuario(req, res) {
    try {
      const { id } = req.params;
      if (req.usuario.role !== 'admin') return res.status(403).json({ message: 'Acesso negado.' });
      const usuario = await Usuario.findById(id);
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });
      if (usuario.ativo) {
        return res.status(400).json({ message: 'Usuário já está ativo.' });
      }
      usuario.ativo = true;
      await usuario.save();
      res.status(200).json({ message: 'Usuário reativado com sucesso.' });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      if (req.usuario.role !== 'admin') return res.status(403).json({ message: 'Acesso negado.' });
      let filtro = {};
      if (req.query.ativo === 'true') filtro.ativo = true;
      if (req.query.ativo === 'false') filtro.ativo = false;
      const usuarios = await Usuario.find(filtro).select('-senha');
      res.status(200).json(usuarios);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  static async logout(req, res) {
    const { username } = req.body;
    try {
      const user = await Usuario.findOne({ username });
      await user.save();
      res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (erro) {
      console.error(erro);
      res.status(400).json({ message: erro.message });
    }
  }
}

export default UsuarioController;
