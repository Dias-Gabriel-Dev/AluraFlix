import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  url: { type: String,
    required: true,
    validate: {
      validator : function(vld) {
        try {
          const url = new URL(vld);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch (_) {
          return false;
        }
      },
      message: props => `${props.value} não é uma URL válida!`
    }
  },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true}
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export default Video;
