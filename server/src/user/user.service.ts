import { User, Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUserById(id: string | number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
    }
}