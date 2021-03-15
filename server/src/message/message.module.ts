import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageResolver } from './messages.resolver';

@Module({
    controllers: [MessageController],
    providers: [MessageService, PrismaService, MessageResolver]
})
export class MessageModule {}
