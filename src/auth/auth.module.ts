import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from '../db/db.module';
import { JwtService } from './jwt.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    { provide: AuthGuard, useClass: JwtGuard },
  ],
})
export class AuthModule {}
