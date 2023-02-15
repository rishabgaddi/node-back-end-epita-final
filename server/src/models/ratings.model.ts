import { model, Schema, Document } from 'mongoose';
import { Rating } from '@/interfaces/ratings.interface';
import movieModel from '@/models/movies.model';
import { HttpException } from '@/exceptions/HttpException';

const ratingSchema: Schema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    commentTitle: {
      type: String,
      required: true,
    },
    commentContent: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
  },
  {
    timestamps: true,
  }
).pre('save', async function (next) {
  const movie = await movieModel.findById(this.movieId);
  if (!movie) {
    next(new HttpException(409, "Movie doesn't exist"));
  } else {
    next();
  }
});

ratingSchema.index({ username: 1, movieId: 1 }, { unique: true });

const ratingModel = model<Rating & Document>('Rating', ratingSchema);

export default ratingModel;
