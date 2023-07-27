import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  @IsNumber()
  artistId: string | null;
}
