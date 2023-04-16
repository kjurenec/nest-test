import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { AuthGuard } from '../shared/guards/auth.guard';

@Injectable()
export class JwtGuard extends AuthGuard {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return false;
  }
}
