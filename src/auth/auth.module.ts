import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './passport/LocalStrategy';
import { SessionSerializer } from './passport/session';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]),PassportModule.register({session:true})],
  controllers: [AuthController],
  providers: [AuthService,localStrategy,SessionSerializer],
})
export class AuthModule {}
