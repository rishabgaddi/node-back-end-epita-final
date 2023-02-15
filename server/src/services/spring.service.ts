import { HttpException } from '@/exceptions/HttpException';
import { Movie } from '@/interfaces/movies.interface';
import { springInstance } from './axios';

class SpringService {
  public async postMovie(movieData: Movie): Promise<Movie> {
    const movie = {
      title: movieData.title,
      added: movieData.createdAt,
      externalId: movieData._id,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(movie);
    const response = await springInstance.post('/movies', body, options);
    if (response.status !== 201) {
      throw new HttpException(500, 'Error posting movie to Spring Boot API');
    }
    return response.data;
  }

  public async getSeenMovieIds(username: string): Promise<string[]> {
    const response = await springInstance.get(
      `/seenmovies?username=${username}`
    );
    if (response.status !== 200) {
      throw new HttpException(
        500,
        'Error getting seen movies from Spring Boot API'
      );
    }
    return response.data;
  }
}

export default SpringService;
