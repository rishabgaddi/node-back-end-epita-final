import { CreateRatingDto } from '@/dtos/ratings.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Rating } from '@/interfaces/ratings.interface';
import ratingModel from '@/models/ratings.model';
import { isEmpty } from 'class-validator';

class RatingService {
  public ratings = ratingModel;

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
      userId: ratingData.userId,
      movieId: ratingData.movieId,
    });
    if (findRating)
      throw new HttpException(
        409,
        `The user ${ratingData.userId} already rated this movie ${ratingData.movieId}`
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
}

export default RatingService;
