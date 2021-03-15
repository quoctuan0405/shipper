import { Message, Prisma } from ".prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Group, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AddMessageDto } from "./dto/add-message.dto";

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async messages(groupId: string | number, cursor?: string | number): Promise<Message[]> {
        if (!isNaN(Number(cursor))) {
            return this.prisma.message.findMany({
                where: {groupId: Number(groupId)},
                skip: 1,
                take: 10,
                cursor: {
                    id: Number(cursor)
                },
                orderBy: {
                    id: 'desc'
                }            
            });

        } else {
            return this.prisma.message.findMany({
                where: {groupId: Number(groupId)},
                take: 10,
                orderBy: {
                    id: 'desc'
                }            
            });
        }
    }

    async getUserById(id: string | number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    async getGroupById(id: string | number): Promise<Group> {
        const group = await this.prisma.group.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!group) {
            throw new NotFoundException("Group not found");
        }

        return group;
    }

    async addMessage(args: AddMessageDto): Promise<Message> {
        const {authorId, groupId, content} = args;

        return this.prisma.message.create({
            data: {
                authorId: Number(authorId),
                groupId: Number(groupId),
                content
            }
        });
    }
}