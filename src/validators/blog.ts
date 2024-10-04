import { IsString, IsOptional, IsObject, isURL } from "class-validator";

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

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
          return Object.keys(value).every((key) => SOCIALS.includes(key) && isURL(value[key]));
        },
      },
    });
  };
}

export class CreateBlogDto {
  @IsString()
  name: string;

  @IsString()
  about: string;

  @IsObject()
  @IsOptional()
  @IsSocial({
    message: `Socials must be a valid URL and one of ${SOCIALS.join(", ")}`,
  })
  socials?: Record<string, string>;

  constructor(data: Partial<CreateBlogDto>) {
    Object.assign(this, data);
  }
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsObject()
  @IsOptional()
  @IsSocial({
    message: `Socials must be a valid URL and one of ${SOCIALS.join(", ")}`,
  })
  socials?: Record<string, string>;

  constructor(data: Partial<UpdateBlogDto>) {
    Object.assign(this, data);
  }
}
