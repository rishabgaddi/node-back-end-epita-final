import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// File options for image and video upload
interface IsFileOptions {
  mime: 'image/jpg' | 'image/png' | 'image/jpeg' | 'video/mp4' | 'video/avi' | 'video/mov';
}

// File validator
export function IsFile(options: IsFileOptions, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value?.mimetype && (options?.mime ?? []).includes(value.mimetype)) {
            return true;
          }
          return false;
        },
      },
    });
  };
}
