import { model, Schema, Document } from 'mongoose';
import { Movie } from '@/interfaces/movies.interface';

const movieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    posterURL: {
      type: String,
    },
    trailerURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.index(
  { title: 1, releaseDate: 1, category: 1, director: 1 },
  { unique: true }
);

const movieModel = model<Movie & Document>('Movie', movieSchema);

export default movieModel;
