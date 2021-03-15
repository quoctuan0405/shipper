import { User } from ".prisma/client";
import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    getUser(
        @Param('id') id: string
    ): Promise<User | null> {
        return this.userService.getUserById(id);
    }
}