import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'user'])
  role: string;
}
