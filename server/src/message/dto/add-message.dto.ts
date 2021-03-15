import { IsNotEmpty } from "class-validator";
import { AddMessageInput } from "src/graphql";

export class AddMessageDto extends AddMessageInput {
    @IsNotEmpty()
    authorId: string

    @IsNotEmpty()
    groupId: string

    @IsNotEmpty()
    content: string
}