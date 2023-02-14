import MoviesController from '@/controllers/movies.controller';
import { CreateMovieDto, UpdateMovieDto } from '@/dtos/movies.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class MoviesRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.moviesController.getMovies);
    this.router.get(`${this.path}/id/:id`, this.moviesController.getMovieById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateMovieDto, 'body'),
      this.moviesController.createMovie
    );
    this.router.put(
      `${this.path}/id/:id`,
      validationMiddleware(UpdateMovieDto, 'body', true),
      this.moviesController.updateMovie
    );
    this.router.delete(
      `${this.path}/id/:id`,
      this.moviesController.deleteMovie
    );
    this.router.post(
      `${this.path}/id/:id/poster`,
      this.moviesController.uploadMoviePoster
    );
    this.router.post(
      `${this.path}/id/:id/trailer`,
      this.moviesController.uploadMovieTrailer
    );
    this.router.get(
      `${this.path}/latest`,
      this.moviesController.getLatestMovies
    );
  }
}

export default MoviesRoute;
