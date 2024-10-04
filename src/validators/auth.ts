import { IsString, IsOptional, IsUrl } from "class-validator";

export class CreateMemberDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  tagline: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  genres?: string[];

  constructor(data: Partial<CreateMemberDto>) {
    Object.assign(this, data);
  }
}

export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  genres?: string[];

  constructor(data: Partial<UpdateMemberDto>) {
    Object.assign(this, data);
  }
}
