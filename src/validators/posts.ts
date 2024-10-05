import {
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  IsBoolean,
  IsEnum,
} from "class-validator";
import { IsSlug, removeUndefined } from "./helpers";
import { PostStatus } from "../types";
import {
  Expose,
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from "class-transformer";

export class CreatePostDto {
  @IsString()
  @Expose()
  blogId: string;

  @IsString()
  @IsOptional()
  @Expose()
  seriesId?: string;

  @IsString()
  @Expose()
  title: string;

  @IsEnum(PostStatus)
  @Expose()
  status: PostStatus;

  @IsString()
  @IsOptional()
  @Expose()
  subtitle: string;

  @IsString()
  @IsSlug({
    message: "Slug must be a valid URL slug",
  })
  @Expose()
  slug: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  @Expose()
  genres?: string[];

  @IsString()
  @Expose()
  content: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  cover_image?: string;

  @IsString()
  @IsOptional()
  @Expose()
  seo_title?: string;

  @IsString()
  @IsOptional()
  @Expose()
  seo_description?: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  canonical_url?: string;

  @IsBoolean()
  @Expose()
  comment_enabled: boolean;

  constructor(data: Partial<CreatePostDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<CreatePostDto>) {
    const val = plainToInstance(CreatePostDto, data, {
      excludeExtraneousValues: true,
    });
    return removeUndefined(val);
  }
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @Expose()
  title?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  @Expose()
  status?: PostStatus;

  @IsString()
  @IsOptional()
  @Expose()
  subtitle?: string;

  @IsString()
  @IsSlug({
    message: "Slug must be a valid URL slug",
  })
  @IsOptional()
  @Expose()
  slug?: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  @Expose()
  genres?: string[];

  @IsString()
  @IsOptional()
  @Expose()
  content?: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  cover_image?: string;

  @IsString()
  @Expose()
  @IsOptional()
  seo_title?: string;

  @IsString()
  @IsOptional()
  @Expose()
  seo_description?: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  canonical_url?: string;

  @IsBoolean()
  @IsOptional()
  @Expose()
  comment_enabled?: boolean;

  constructor(data: Partial<UpdatePostDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<UpdatePostDto>) {
    const val = plainToInstance(UpdatePostDto, data, {
      excludeExtraneousValues: true,
    });
    return removeUndefined(val);
  }
}

export class CreateCommentDto {
  @IsString()
  @Expose()
  postId: string;

  @IsString()
  @Expose()
  content: string;

  constructor(data: Partial<CreateCommentDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<CreateCommentDto>) {
    const val = plainToInstance(CreateCommentDto, data, {
      excludeExtraneousValues: true,
    });
    return removeUndefined(val);
  }
}
