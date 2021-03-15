import { IsNotEmpty } from "class-validator";
import { GetMessagesInput } from "src/graphql";

export class GetMessagesDto extends GetMessagesInput {
    @IsNotEmpty()
    groupId: string;

    cursor: string;
}