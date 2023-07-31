import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  isString,
  IsOptional,
} from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  grammy: boolean;
}
