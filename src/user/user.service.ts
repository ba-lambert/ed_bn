import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { updateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private profileRepository : Repository<User>,
    @InjectRepository(Auth)
    private authRepository:Repository<Auth>
  ){}
  async create(createUserDto: createUserDto): Promise<{ profile: User, statusCode: HttpStatus }> {
    try {
      const { auth: authDto, ...profileData } = createUserDto;
      const auth = this.authRepository.create(authDto);
      await this.authRepository.save(auth);

    const profile = this.profileRepository.create({
      ...profileData,
      auth,
    });
    await this.profileRepository.save(profile);
    return 
    } catch (error) {
      throw new HttpException('Failed to create profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.profileRepository.find({ relations: ['auth'] });
  }

  // async findOne(id: number): Promise<User> {
  //   try {
  //     const profile = await this.profileRepository.findOne(id, { relations: ['auth'] });
  //     if (!profile) {
  //       throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
  //     }
  //     return profile;
  //   } catch (error) {
  //     throw new HttpException('Failed to find profile', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  update(id: number, updateUserDto: updateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
