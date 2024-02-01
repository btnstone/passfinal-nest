// custom-email-validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAllowedConstraint implements ValidatorConstraintInterface {
  constructor(private configService: ConfigService) {}

  validate(email: any, _args: ValidationArguments) {
    const allowedDomains = this.configService.get<string[]>(
      'email.allowedDomains',
      [],
    );
    const emailDomain = email.split('@')[1];
    return allowedDomains.includes(emailDomain);
  }

  defaultMessage(_args: ValidationArguments) {
    return `This email domain is not allowed.`;
  }
}

export function IsEmailAllowed(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAllowedConstraint,
    });
  };
}
