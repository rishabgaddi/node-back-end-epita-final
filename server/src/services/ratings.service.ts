import { CreateRatingDto } from '@/dtos/ratings.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Movie } from '@/interfaces/movies.interface';
import { Rating } from '@/interfaces/ratings.interface';
import movieModel from '@/models/movies.model';
import ratingModel from '@/models/ratings.model';
import { isEmpty } from 'class-validator';

class RatingService {
  public ratings = ratingModel;
  public movies = movieModel;

  public async findAllRating(): Promise<Rating[]> {
    const ratings: Rating[] = await this.ratings.find();
    return ratings;
  }

  public async findRatingById(ratingId: string): Promise<Rating> {
    if (isEmpty(ratingId)) throw new HttpException(400, 'RatingId is empty');

    const findRating: Rating = await this.ratings.findOne({ _id: ratingId });
    if (!findRating) throw new HttpException(409, "Rating doesn't exist");

    return findRating;
  }

  public async createRating(ratingData: CreateRatingDto): Promise<Rating> {
    if (isEmpty(ratingData))
      throw new HttpException(400, 'ratingData is empty');

    const findRating: Rating = await this.ratings.findOne({
      username: ratingData.username,
      movieId: ratingData.movieId,
    });
    if (findRating)
      throw new HttpException(
        409,
        `The user ${ratingData.username} already rated this movie ${ratingData.movieId}`
      );

    const createRatingData: Rating = await this.ratings.create({
      ...ratingData,
    });
    return createRatingData;
  }

  public async updateRating(
    ratingId: string,
    ratingData: CreateRatingDto
  ): Promise<Rating> {
    if (isEmpty(ratingData))
      throw new HttpException(400, 'ratingData is empty');

    const updateRating: Rating = await this.ratings.findByIdAndUpdate(
      { _id: ratingId },
      { ...ratingData },
      { new: true }
    );
    if (!updateRating) throw new HttpException(409, "Rating doesn't exist");

    return updateRating;
  }

  public async deleteRating(ratingId: string): Promise<Rating> {
    const deleteRatingById: Rating = await this.ratings.findByIdAndDelete(
      ratingId
    );
    if (!deleteRatingById) throw new HttpException(409, "Rating doesn't exist");

    return deleteRatingById;
  }

  public async findRatingByMovieIdAndUsername(
    movieId: string,
    username: string
  ): Promise<Rating> {
    const findRating: Rating = await this.ratings.findOne({
      movieId: movieId,
      username: username,
    });
    if (!findRating) throw new HttpException(409, "Rating doesn't exist");

    return findRating;
  }

  public async findTopRatedMovies(): Promise<Movie[]> {
    const topTenRated: any[] = await this.ratings
      .aggregate([
        {
          $group: {
            _id: '$movieId',
            averageRating: { $avg: '$rating' },
          },
        },
        {
          $sort: {
            averageRating: -1,
          },
        },
        {
          $limit: 10,
        },
      ])
      .exec();

    const movieIds: string[] = topTenRated.map((movie) => movie._id);
    const topTenRatedMovies: Movie[] = await this.movies.find({
      _id: { $in: movieIds },
    });

    if (!topTenRatedMovies)
      throw new HttpException(409, "Rating doesn't exist");

    return topTenRatedMovies;
  }
}

export default RatingService;
