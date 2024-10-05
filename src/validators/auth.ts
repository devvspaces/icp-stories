import { Expose, plainToClass } from "class-transformer";
import { IsString, IsOptional, IsUrl } from "class-validator";
import { removeUndefined } from "./helpers";

export class CreateMemberDto {
  @IsString()
  @Expose()
  username: string;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  tagline: string;

  @IsString()
  @IsOptional()
  @Expose()
  bio?: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  image?: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  @Expose()
  genres?: string[];

  constructor(data: Partial<CreateMemberDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<CreateMemberDto>) {
    return removeUndefined(
      plainToClass(CreateMemberDto, data, { excludeExtraneousValues: true })
    );
  }
}

export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  tagline?: string;

  @IsString()
  @IsOptional()
  @Expose()
  bio?: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  image?: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  @Expose()
  genres?: string[];

  constructor(data: Partial<UpdateMemberDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<UpdateMemberDto>) {
    return removeUndefined(
      plainToClass(UpdateMemberDto, data, { excludeExtraneousValues: true })
    );
  }
}
