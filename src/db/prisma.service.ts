import { INestApplication, Injectable } from '@nestjs/common';
import { DbService } from 'src/shared/services/db.service';

@Injectable()
export class PrismaService extends DbService {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
