import { IsNotEmpty } from 'class-validator';

export class UserRegistrationDTO {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly height: number;

  @IsNotEmpty()
  readonly weight: number;

  @IsNotEmpty()
  gender: string;
}
