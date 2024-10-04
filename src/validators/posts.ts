import {
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  IsBoolean,
  IsEnum,
} from "class-validator";
import { IsSlug } from "./helpers";
import { PostStatus } from "../types";

export class CreatePostDto {
  @IsString()
  blogId: string;

  @IsString()
  @IsOptional()
  seriesId?: string;

  @IsString()
  title: string;

  @IsEnum(PostStatus)
  status: PostStatus;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsSlug()
  slug: string;

  @IsArray({
    each: true,
  })
  @IsOptional()
  genres?: string[];

  @IsString()
  content: string;

  @IsUrl()
  @IsOptional()
  cover_image?: string;

  @IsString()
  @IsOptional()
  seo_title?: string;

  @IsString()
  @IsOptional()
  seo_description?: string;

  @IsUrl()
  @IsOptional()
  canonical_url?: string;

  @IsBoolean()
  comment_enabled: boolean;

  constructor(data: Partial<CreatePostDto>) {
    Object.assign(this, data);
  }
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsSlug()
  @IsOptional()
  slug?: string;

  @IsArray({
    each: true,
  })
  @IsOptional()
  genres?: string[];

  @IsString()
  @IsOptional()
  content?: string;

  @IsUrl()
  @IsOptional()
  cover_image?: string;

  @IsString()
  @IsOptional()
  seo_title?: string;

  @IsString()
  @IsOptional()
  seo_description?: string;

  @IsUrl()
  @IsOptional()
  canonical_url?: string;

  @IsBoolean()
  @IsOptional()
  comment_enabled?: boolean;

  constructor(data: Partial<UpdatePostDto>) {
    Object.assign(this, data);
  }
}

export class CreateCommentDto {
  @IsString()
  postId: string;

  @IsString()
  content: string;

  constructor(data: Partial<CreateCommentDto>) {
    Object.assign(this, data);
  }
}
