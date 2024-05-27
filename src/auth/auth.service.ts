import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto, Role } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/middlewares/bcrypt';
import bcypt,{compare} from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository:Repository<Auth>,
  ){}
  @HttpCode(HttpStatus.CREATED)
  async create(username: string, password: string, roles?: Role[]): Promise<{ message: string,status?:any }> {
    try {
      const existingUser = await this.authRepository.findOne({ where: { username } });
      
      if (existingUser) {
        return {message:'Username already exists',status: HttpStatus.CONFLICT};
      }
      const newHash: string = await hashPassword(password);
      const userRoles: Role[] = roles && roles.length > 0 ? roles : [Role.USER];
      const user =this.authRepository.create({ username, password: newHash, roles: userRoles });
      await this.authRepository.save(user);
      return { message: 'User created successfully' };
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(){

  }

 async findAll() {
    return this.authRepository.find();
  }

  findOne(id: any) {
    return this.authRepository.findOne(id);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.delete(id);
  }

  remove(id: number) {
    return this.authRepository.delete(id);
  }

  async findByUsername(username:string){
    return this.authRepository.find({where:{username}})
  }

  async validateUser(username: string, password: string): Promise<any> {
    const auth = await this.authRepository.findOne({where:{username}});
    console.log(auth.password)
    if (auth && await compare(password,auth.password)) {
      const { password, ...result } = auth;
      return result;
    }
    return null;
  }
}
