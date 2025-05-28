import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String,
        enum: ['admin', 'docente', 'aluno'],
        default: 'aluno',
        required: true
    }
});

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

usuarioSchema.methods.compararSenha = function(senhaDigitada) {
    return bcrypt.compare(senhaDigitada, this.senha);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;