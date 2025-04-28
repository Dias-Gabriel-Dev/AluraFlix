import mongoose from "mongoose";


const categoriaSchema = new mongoose.Schema({
    id: { type:mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    cor: {type: String, enum: cor, required: true } 
});

const categorias = mongoose.model('categoria', categoriaSchema);

export { categorias, categoriaSchema }