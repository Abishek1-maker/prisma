/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'; // ← add this import (very important for .env)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ← add this line (loads .env file)
    PrismaModule, // only one time
    ClientsModule, // correct, no .for
    // add other modules here later
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
