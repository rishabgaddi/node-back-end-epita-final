import RatingsController from '@/controllers/ratings.controller';
import { CreateRatingDto } from '@/dtos/ratings.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class RatingsRoute implements Routes {
  public path = '/ratings';
  public router = Router();
  public ratingsController = new RatingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ratingsController.getRatings);
    this.router.get(`${this.path}/:id`, this.ratingsController.getRatingById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateRatingDto, 'body'),
      this.ratingsController.createRating
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateRatingDto, 'body', true),
      this.ratingsController.updateRating
    );
    this.router.delete(`${this.path}/:id`, this.ratingsController.deleteRating);
  }
}

export default RatingsRoute;
