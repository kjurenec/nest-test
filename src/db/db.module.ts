import { Module } from '@nestjs/common';
import { DbService } from '../shared/services/db.service';
import { PrismaService } from './prisma.service';

@Module({
  exports: [DbService],
  providers: [{ provide: DbService, useClass: PrismaService }],
})
export class DbModule {}
