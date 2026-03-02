/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // ← important!

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    console.log('All env:', process.env);
    console.log('DATABASE_URL is:', process.env.DATABASE_URL);

    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL not found in .env');
    }

    // Create pool first (required for adapter-pg in Prisma 7+)
    const pool = new Pool({
      connectionString,
      // optional: max: 10, idleTimeoutMillis: 30000, etc. for Neon
    });

    const adapter = new PrismaPg(pool); // ← pass pool here

    super({ adapter }); // ← pass { adapter } here → fixes the error
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
