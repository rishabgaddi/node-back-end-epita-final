import { HttpException } from '@/exceptions/HttpException';
import { CreateMovieDto, UpdateMovieDto } from '@/dtos/movies.dto';
import { Movie } from '@/interfaces/movies.interface';
import movieModel from '@/models/movies.model';
import { isEmpty } from 'class-validator';

class MovieService {
  public movies = movieModel;

  public async findAllMovie(): Promise<Movie[]> {
    const movies: Movie[] = await this.movies.find();
    return movies;
  }

  public async findMovieById(movieId: string): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, 'MovieId is empty');

    const findMovie: Movie = await this.movies.findOne({ _id: movieId });
    if (!findMovie) throw new HttpException(409, "Movie doesn't exist");

    return findMovie;
  }

  public async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, 'movieData is empty');

    const findMovie: Movie = await this.movies.findOne(movieData);
    if (findMovie)
      throw new HttpException(
        409,
        `This movie ${movieData.title} already exists`
      );

    const createMovieData: Movie = await this.movies.create({ ...movieData });
    return createMovieData;
  }

  public async updateMovie(
    movieId: String,
    movieData: UpdateMovieDto
  ): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, 'movieData is empty');

    const updateMovie: Movie = await this.movies.findByIdAndUpdate(
      { _id: movieId },
      { ...movieData },
      { new: true }
    );
    if (!updateMovie) throw new HttpException(409, "Movie doesn't exist");

    return updateMovie;
  }

  public async deleteMovie(movieId: string): Promise<Movie> {
    const deleteMovieById: Movie = await this.movies.findByIdAndDelete(movieId);
    if (!deleteMovieById) throw new HttpException(409, "Movie doesn't exist");

    return deleteMovieById;
  }

  public async updateMoviePoster(
    movieId: string,
    poster: string
  ): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, 'MovieId is empty');
    if (isEmpty(poster)) throw new HttpException(400, 'Poster is empty');

    const updatedMovie: Movie = await this.movies.findByIdAndUpdate(
      { _id: movieId },
      { posterURL: poster },
      { new: true }
    );
    if (!updatedMovie) throw new HttpException(409, "Movie doesn't exist");

    return updatedMovie;
  }

  public async updateMovieTrailer(
    movieId: string,
    trailer: string
  ): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, 'MovieId is empty');
    if (isEmpty(trailer)) throw new HttpException(400, 'Trailer is empty');

    const updatedMovie: Movie = await this.movies.findByIdAndUpdate(
      { _id: movieId },
      { trailerURL: trailer },
      { new: true }
    );
    if (!updatedMovie) throw new HttpException(409, "Movie doesn't exist");

    return updatedMovie;
  }

  public async getLatestMovies(): Promise<Movie[]> {
    // Get all movies whose createdAt is within the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const latestMovies: Movie[] = await this.movies
      .find({
        createdAt: { $gte: thirtyDaysAgo },
      })
      .sort({ createdAt: -1 });

    return latestMovies;
  }
}

export default MovieService;
