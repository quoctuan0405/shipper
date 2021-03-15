import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupController } from './group.controller';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
    providers: [GroupService, PrismaService, GroupResolver],
    controllers: [GroupController]
})
export class GroupModule {}
