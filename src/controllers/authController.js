import Usuario from "../models/Usuario.js";
import jwt from 'jsonwebtoken';
import { criarUsuario } from "../utils/criarUsuario.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async(req, res) => {
    const { username, senha } = req.body;
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
        return res.status(401).json({ message: 'Usuário e senha inválido' });
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
        return res.status(401).json({ message: 'Usuário e senha inválido' });
    }

    const token = jwt.sign({ id: usuario._id, username: usuario.username, role: usuario.role },
        JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
};

export const registrar = async (req, res) => {
    const { username, senha } = req.body;
    if(!username || !senha) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios.'});
    }
    try {
        await criarUsuario(req.body);
        res.status(201).json({ message: 'Usuário criado com sucesso!'});
    } catch (erro) {
        res.status(400).json({ message: erro.message });
    }
};

export const criarUsuarioAvancado = async (req, res) => {
    const {username, senha, role } = req.body;
    if (!['docente', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Role inválida para este endpoint.' });
    }
    try {
        const existente = await Usuario.findOne({ username });
        if (existente) throw new Error('Usuário já existe.');
        const usuario = new Usuario({ username, senha, role });
        await usuario.save();
        res.status(201).json({ message: 'Usuário criado com sucesso!', usuario });
    } catch (erro) {
        res.status(400).json({ message: erro.message });
    }
};

// export const logOut = async (req, res) => {
//     const { username } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         user.sessionToken = null;
//         await user.save();
//         res.status(200).json({ message: 'Logout realizado com sucesso' });
//     } catch (erro) {
//         console.error(erro);
//         res.status(500).json({ message: 'Erro ao realizar logout' });
