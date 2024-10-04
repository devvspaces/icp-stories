import {
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  IsEnum,
} from "class-validator";
import { SeriesSorting } from "../types";

export class CreateSeriesDto {
  @IsString()
  blogId: string;

  @IsString()
  name: string;

  @IsEnum(SeriesSorting)
  sorting: SeriesSorting;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray({
    each: true,
  })
  @IsOptional()
  genres?: string[];

  @IsUrl()
  @IsOptional()
  cover_image?: string;

  constructor(data: Partial<CreateSeriesDto>) {
    Object.assign(this, data);
  }
}

export class UpdateSeriesDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(SeriesSorting)
  @IsOptional()
  sorting?: SeriesSorting;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray({
    each: true,
  })
  @IsOptional()
  genres?: string[];

  @IsUrl()
  @IsOptional()
  cover_image?: string;

  constructor(data: Partial<UpdateSeriesDto>) {
    Object.assign(this, data);
  }
}
