import { Movie } from '@/interfaces/movies.interface';
import { IsString, IsNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CreateRatingDto {
  @IsNumber()
  public rating: number;

  @IsString()
  public commentTitle: string;

  @IsString()
  public commentContent: string;

  @IsString()
  public userId: string;

  @IsObjectId()
  public movieId: Movie['_id'];
}
