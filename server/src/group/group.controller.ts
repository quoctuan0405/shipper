import { Controller, Get, Param } from "@nestjs/common";
import { Group } from "@prisma/client";
import { GroupService } from "./group.service";

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get('/:id')
    getGroup(
        @Param('id') id: string
    ): Promise<Group | null> {
        return this.groupService.getGroupById(id);
    }
}