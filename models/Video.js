import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "O título é obrigatório"],
    minlength: [3, "Mínimo 3 caracteres"],
    maxlength: [30, "Máximo de 30 caracteres"]
  },
  url: {
    type: String,
    required: [true, "A URL é obrigatória"],
    immutable: true, // impede alterações após criação
    validate: {
      validator: function (value) {
        const regex = /^https:\/\/[\w\-]+(\.[\w\-]+)+([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/;
        return regex.test(value);
      },
      message: "URL inválida — deve começar com https:// e ser bem formada"
    }
  },
  category: {
    type: String,
    enum: ["Educação", "Entretenimento", "Tecnologia"],
    default: "Entretenimento"
  }
}, {
  timestamps: true
});

export default mongoose.model("Video", videoSchema);
