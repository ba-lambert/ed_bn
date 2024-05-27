import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private profileRepository : Repository<User>,
  ){}
  async create(createUserDto: CreateUserDto): Promise<{ profile: User, statusCode: HttpStatus }> {
    try {
      const profile = this.profileRepository.create(createUserDto);
      const savedProfile = await this.profileRepository.save(profile);
      return { profile: savedProfile, statusCode: HttpStatus.CREATED };
    } catch (error) {
      throw new HttpException('Failed to create profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<User> {
    try {
      const profile = await this.profileRepository.findOne(id, { relations: ['auth'] });
      if (!profile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }
      return profile;
    } catch (error) {
      throw new HttpException('Failed to find profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
