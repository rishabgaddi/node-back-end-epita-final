import { Movie } from './movies.interface';

export interface Rating {
  _id: string;
  rating: number;
  commentTitle: string;
  commentContent: string;
  userId: string;
  movieId: Movie['_id'];
}
