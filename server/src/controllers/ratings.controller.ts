import { NextFunction, Request, Response } from 'express';
import { Rating } from '@/interfaces/ratings.interface';
import RatingService from '@/services/ratings.service';
import { Movie } from '@/interfaces/movies.interface';

class RatingsController {
  public ratingService = new RatingService();

  public getRatings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllRatingsData: Rating[] =
        await this.ratingService.findAllRating();

      res.status(200).json({ ratings: findAllRatingsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRatingById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ratingId: string = req.params.id;
      const findOneRatingData: Rating = await this.ratingService.findRatingById(
        ratingId
      );

      res.status(200).json({ rating: findOneRatingData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRating = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ratingData: Rating = req.body;
      const createRatingData: Rating = await this.ratingService.createRating(
        ratingData
      );

      res.status(201).json({ rating: createRatingData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRating = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ratingId: string = req.params.id;
      const ratingData: Rating = req.body;
      const updateRatingData: Rating = await this.ratingService.updateRating(
        ratingId,
        ratingData
      );

      res.status(200).json({ rating: updateRatingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRating = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ratingId: string = req.params.id;
      const deleteRatingData: Rating = await this.ratingService.deleteRating(
        ratingId
      );

      res.status(200).json({ rating: deleteRatingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getRatingByMovieIdForUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.movieId;
      const username: string = req.params.username;
      const findOneRatingData: Rating =
        await this.ratingService.findRatingByMovieIdAndUsername(
          movieId,
          username
        );

      res.status(200).json({ rating: findOneRatingData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getTopRatedMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const topRatedMovies: Movie[] =
        await this.ratingService.findTopRatedMovies();

      res.status(200).json({ movies: topRatedMovies, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default RatingsController;
