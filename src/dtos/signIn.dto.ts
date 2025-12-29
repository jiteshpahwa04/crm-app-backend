import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class SignInDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
