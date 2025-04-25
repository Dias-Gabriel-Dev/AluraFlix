import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "O título é obrigatório"],
    minlength: [3, "Mínimo 3 caracteres"],
    maxlength: [30, 'Máximo de 30 caracteres']
  },
  url: {
    type: String,
    required: true,
    // match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, "URL inválida"]
  },
  category: {
    type: String,
    enum: ["Educação", "Entretenimento", "Tecnologia"],
    default: "Entretenimento"
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

export default mongoose.model("Video", videoSchema);
