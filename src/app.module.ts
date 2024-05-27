import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { EventsModule } from './events/events.module';
import { AudiosModule } from './audios/audios.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'eddB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize:true
    }),
    AuthModule,
    AppointmentsModule,
    EventsModule,
    AudiosModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
