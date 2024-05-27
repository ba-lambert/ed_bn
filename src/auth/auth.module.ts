import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { LocalStrategy } from './passport/LocalStrategy';
import { SessionSerializer } from './passport/session';
import { AuthGuard } from './passport/Auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, AuthGuard],
})
export class AuthModule {}
