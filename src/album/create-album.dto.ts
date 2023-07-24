import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}
