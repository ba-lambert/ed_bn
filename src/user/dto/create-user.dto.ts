import { IsNotEmpty, IsString } from "class-validator";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";

export class createUserDto {
  firstName: string;
  lastName: string;
  age: number;
  auth: CreateAuthDto;
}