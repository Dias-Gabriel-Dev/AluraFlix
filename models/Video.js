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
    validate: {
      validator: function (value) {
        const regex = /^(?:https?:\/\/)?(?:[\w-]+\.)+[a-zA-Z]{2,}(?:\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i

        return regex.test(value);
      },
      message: "URL inválida."
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
