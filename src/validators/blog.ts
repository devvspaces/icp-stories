import { Expose, plainToClass, plainToInstance } from "class-transformer";
import { IsString, IsOptional, IsObject, isURL } from "class-validator";

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { removeUndefined } from "./helpers";

export const SOCIALS = [
  "twitter",
  "linkedin",
  "github",
  "website",
  "youtube",
  "instagram",
];

export function IsSocial(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsSocial",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Record<string, string>, args: ValidationArguments) {
          return Object.keys(value).every(
            (key) => SOCIALS.includes(key) && isURL(value[key])
          );
        },
      },
    });
  };
}

export class CreateBlogDto {
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  about: string;

  @IsObject()
  @IsOptional()
  @Expose()
  @IsSocial({
    message: `Socials must be a valid URL and one of ${SOCIALS.join(", ")}`,
  })
  socials?: Record<string, string>;

  constructor(data: Partial<CreateBlogDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<CreateBlogDto>) {
    const val = plainToInstance(UpdateBlogDto, data, {
      excludeExtraneousValues: true,
    });
    return removeUndefined(val);
  }
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  about?: string;

  @IsObject()
  @IsOptional()
  @Expose()
  @IsSocial({
    message: `Socials must be a valid URL and one of ${SOCIALS.join(", ")}`,
  })
  socials?: Record<string, string>;

  constructor(data: Partial<UpdateBlogDto>) {
    Object.assign(this, data);
  }

  static fromPlain(data: Partial<UpdateBlogDto>) {
    const val = plainToInstance(UpdateBlogDto, data, {
      excludeExtraneousValues: true,
    });
    return removeUndefined(val);
  }
}
