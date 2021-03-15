import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { UserService } from "./user.service";

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query('user')
    async getUser(@Args('id') id: string): Promise<User | null> {
        return await this.userService.getUserById(id)
    }
}