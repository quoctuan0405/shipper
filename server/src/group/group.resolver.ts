import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Group, User } from "@prisma/client";
import { GroupService } from "./group.service"; 

@Resolver('Group')
export class GroupResolver {
    constructor(private groupService: GroupService) {}

    @Query('group')
    async getGroup(@Args('id') id: string): Promise<Group | null> {
        return this.groupService.getGroupById(id);
    }

    @ResolveField('users')
    async getUsersByGroup(@Parent() group: Group): Promise<User[]> {
        return this.groupService.getUsersByGroupId(group.id);
    }

    @Mutation('createGroup')
    async createGroup(@Args('users') users: string[]): Promise<Group> {
        return this.groupService.createGroup(users);
    }

    @Mutation('addUsersToGroup')
    async addUserToGroup(@Args('id') id: string, @Args('users') users: string[]): Promise<Group> {
        return this.groupService.addUsersToGroup(id, users);
    }
}