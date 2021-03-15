import { Controller, Get, Param } from "@nestjs/common";
import { Message } from "@prisma/client";
import { MessageService } from "./message.service";

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}
    
    @Get('/:groupId/:cursor?')
    async getMessage(
        @Param('groupId') groupId: string,
        @Param('cursor') cursor: string
    ): Promise<Message[]> {
        return this.messageService.messages(groupId, cursor);
    }
} 