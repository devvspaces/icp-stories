import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsSlug(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsSlug",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
        },
      },
    });
  };
}

export function removeUndefined<T extends object>(obj: T): T {
  Object.keys(obj).forEach(
    (key) => (obj as any)[key] === undefined && delete (obj as any)[key]
  );
  return obj;
}
