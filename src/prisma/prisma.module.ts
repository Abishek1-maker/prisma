import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // same folder, good

@Global() // ← this is magic line - makes it work everywhere
@Module({
  providers: [PrismaService], // tell Nest: "I have this service"
  exports: [PrismaService], // tell Nest: "other modules can use it"
})
export class PrismaModule {}
