import { NextFunction, Request, Response } from 'express';
import MovieService from '@/services/movies.service';
import { Movie } from '@/interfaces/movies.interface';
import { CreateMovieDto, UpdateMovieDto } from '@/dtos/movies.dto';
import AWS from 'aws-sdk';
import SpringService from '@/services/spring.service';

class MoviesController {
  public movieService = new MovieService();
  public springService = new SpringService();

  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.s3 = new AWS.S3({
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
      },
    });
  }

  public getMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllMoviesData: Movie[] = await this.movieService.findAllMovie();

      res.status(200).json({ movies: findAllMoviesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMovieById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.id;
      const findOneMovieData: Movie = await this.movieService.findMovieById(
        movieId
      );

      res.status(200).json({ movie: findOneMovieData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieData: CreateMovieDto = req.body;
      const createMovieData: Movie = await this.movieService.createMovie(
        movieData
      );

      // Post movie to Spring Boot API
      await this.springService.postMovie(createMovieData);

      res.status(201).json({ movie: createMovieData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.id;
      const movieData: UpdateMovieDto = req.body;
      const updateMovieData: Movie = await this.movieService.updateMovie(
        movieId,
        movieData
      );

      res.status(200).json({ movie: updateMovieData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.id;
      const deleteMovieData: Movie = await this.movieService.deleteMovie(
        movieId
      );

      res.status(200).json({ movie: deleteMovieData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public uploadMoviePoster = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.id;
      const buffer = await new Promise((resolve, reject) => {
        let chunks: any = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        req.on('error', (err) => reject(err));
      });

      const fileName: string = req
        .get('Content-Disposition')
        .split('filename=')[1];

      const result = await this.s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${movieId}-${fileName}`,
          Body: buffer,
          ContentType: req.get('Content-Type'),
          ContentDisposition: req.get('Content-Disposition'),
        })
        .promise();

      const updatedMovie: Movie = await this.movieService.updateMoviePoster(
        movieId,
        result.Location
      );

      res.status(200).json({ movie: updatedMovie, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public uploadMovieTrailer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieId: string = req.params.id;
      const buffer = await new Promise((resolve, reject) => {
        let chunks: any = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        req.on('error', (err) => reject(err));
      });

      const fileName: string = req
        .get('Content-Disposition')
        .split('filename=')[1];

      const result = await this.s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${movieId}-${fileName}`,
          Body: buffer,
          ContentType: req.get('Content-Type'),
          ContentDisposition: req.get('Content-Disposition'),
        })
        .promise();

      const updatedMovie: Movie = await this.movieService.updateMovieTrailer(
        movieId,
        result.Location
      );

      res.status(200).json({ movie: updatedMovie, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getLatestMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const latestMovies: Movie[] = await this.movieService.getLatestMovies();

      res.status(200).json({ movies: latestMovies, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSeenMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const username: string = req.params.username;
      const movieIds: string[] = await this.springService.getSeenMovieIds(
        username
      );

      const seenMovies: Movie[] = await this.movieService.findAllByIds(
        movieIds
      );

      res.status(200).json({ movies: seenMovies, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default MoviesController;
