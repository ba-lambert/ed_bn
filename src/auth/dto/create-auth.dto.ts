import { IsString, IsArray, IsOptional } from 'class-validator';
export class CreateAuthDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsArray()
  @IsOptional()
  roles?: Role[];
}

export enum Role {
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin',
    USER = 'user',
  }