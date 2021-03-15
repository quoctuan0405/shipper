import { Injectable } from "@nestjs/common";
import { Group, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GroupService {
    constructor(private readonly prisma: PrismaService) {}

    async getGroupById(id: string | number): Promise<Group | null> {
        return this.prisma.group.findUnique({
            where: {
                id: Number(id)
            }
        });
    }

    async getUsersByGroupId(groupId: string | number): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                groups: {
                    some: {
                        id: Number(groupId)
                    }
                }
            }
        }); 
    }

    async createGroup(userIds: string[] | number[]) {
        const connectToUserArray = [];

        for (let userId of userIds) {
            connectToUserArray.push({id: Number(userId)});
        }

        return this.prisma.group.create({
            data: {
                users: {
                    connect: connectToUserArray
                }
            }
        })
    }

    async addUsersToGroup(groupId: string | number, userIds: string[] | number[]): Promise<Group> {
        const connectToUserArray = [];

        const usersInGroup = await this.getUsersByGroupId(groupId);

        for (let userId of userIds) {
            connectToUserArray.push({id: Number(userId)});
        }

        for (let user of usersInGroup) {
            connectToUserArray.push({id: Number(user.id)});
        }

        return this.prisma.group.update({
            where: {
                id: Number(groupId)
            },
            data: {
                users: {
                    connect: connectToUserArray
                }
            }
        });
    }
} 