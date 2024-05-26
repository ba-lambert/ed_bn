import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
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
  async create(username:string,password:string) {
    const newHash:string = await hashPassword(password);
    const user = await this.authRepository.create({username,password:newHash})
    return this.authRepository.save(user);
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
