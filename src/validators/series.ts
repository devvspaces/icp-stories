import { IsString, IsOptional, IsUrl, IsEnum } from "class-validator";
import { SeriesSorting } from "../types";
import { Expose, plainToClass } from "class-transformer";
import { removeUndefined } from "./helpers";

export class CreateSeriesDto {
  @IsString()
  @Expose()
  blogId: string;

  @IsString()
  @Expose()
  name: string;

  @IsEnum(SeriesSorting)
  @Expose()
  sorting: SeriesSorting;

  @IsString()
  @IsOptional()
  @Expose()
  description: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  @Expose()
  genres?: string[];

  @IsUrl()
  @IsOptional()
  @Expose()
  cover_image?: string;

  constructor(data: Partial<CreateSeriesDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<CreateSeriesDto>) {
    return removeUndefined(
      plainToClass(CreateSeriesDto, data, { excludeExtraneousValues: true })
    );
  }
}

export class UpdateSeriesDto {
  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsEnum(SeriesSorting)
  @IsOptional()
  @Expose()
  sorting?: SeriesSorting;

  @IsString()
  @IsOptional()
  @Expose()
  description?: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  @Expose()
  genres?: string[];

  @IsUrl()
  @IsOptional()
  @Expose()
  cover_image?: string;

  constructor(data: Partial<UpdateSeriesDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<UpdateSeriesDto>) {
    return removeUndefined(
      plainToClass(UpdateSeriesDto, data, { excludeExtraneousValues: true })
    );
  }
}
