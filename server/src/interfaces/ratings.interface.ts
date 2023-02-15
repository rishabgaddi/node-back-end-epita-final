import { Movie } from './movies.interface';

export interface Rating {
  _id: string;
  rating: number;
  commentTitle: string;
  commentContent: string;
  username: string;
  movieId: Movie['_id'];
}
