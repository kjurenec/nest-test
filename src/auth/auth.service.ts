import { Injectable } from '@nestjs/common';
import { DbService } from '../shared/services/db.service';
import { User } from '../shared/models/user';
import { Account } from '../shared/models/account';

@Injectable()
export class AuthService {
  constructor(private dbService: DbService) {}

  createUser(data: Omit<AuthUser, 'id'>) {
    return this.dbService.user.create({ data });
  }

  getUser(id: string) {
    return this.dbService.user.findUnique({ where: { id } });
  }

  getUserByEmail(email: string) {
    return this.dbService.user.findUnique({ where: { email } });
  }

  async getUserByAccount(
    providerAccountId: Pick<AuthAccount, 'provider' | 'providerAccountId'>,
  ) {
    const account = await this.dbService.account.findUnique({
      where: {
        provider_providerAccountId: providerAccountId,
      },
      select: { user: true },
    });
    return account?.user ?? null;
  }

  updateUser({ id, ...data }: Partial<AuthUser> & Pick<AuthUser, 'id'>) {
    return this.dbService.user.update({ where: { id }, data });
  }

  deleteUser(id: string) {
    return this.dbService.user.delete({ where: { id } });
  }

  linkAccount(data: AuthAccount) {
    return this.dbService.account.create({ data });
  }

  unlinkAccount(
    providerAccountId: Pick<AuthAccount, 'provider' | 'providerAccountId'>,
  ) {
    return this.dbService.account.delete({
      where: { provider_providerAccountId: providerAccountId },
    });
  }
}

interface AuthUser extends User {
  id: string;
  email: string;
  emailVerified: Date | null;
}

interface AuthAccount extends Account {
  userId: string;
}
