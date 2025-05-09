import mongoose from "mongoose";


const categoriaSchema = new mongoose.Schema({
  nome: { type: String , required: true, unique: true },
  cor: { type: String, required: true },
  }, { timestamps: true });

const Categoria = mongoose.model('Categoria', categoriaSchema);

export default Categoria;



