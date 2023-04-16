import { PrismaClient } from '@prisma/client';

export abstract class DbService extends PrismaClient {}
