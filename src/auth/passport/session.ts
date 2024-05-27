// auth.service.ts (add these methods)
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(user: Auth, done: (err: Error, user: Auth) => void): void {
    done(null, user);
  }

  async deserializeUser(user: Auth, done: (err: Error, user: Auth) => void): Promise<void> {
    const userDB = await this.authService.findOne(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
