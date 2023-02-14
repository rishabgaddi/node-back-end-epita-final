import { IsString, IsISO8601 } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  public title: string;

  @IsISO8601()
  public releaseDate: string;

  @IsString()
  public category: string;

  @IsString()
  public director: string;
}

export class UpdateMovieDto {
  @IsString()
  public title: string;

  @IsISO8601()
  public releaseDate: string;

  @IsString()
  public category: string;

  @IsString()
  public director: string;

  @IsString()
  public posterURL: string;

  @IsString()
  public trailerURL: string;
}
