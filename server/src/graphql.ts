
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Type {
    CUSTOMER = "CUSTOMER",
    SHIPPER = "SHIPPER"
}

export class GetMessagesInput {
    groupId: string;
    cursor?: string;
}

export class AddMessageInput {
    authorId: string;
    groupId: string;
    content: string;
}

export class User {
    id: string;
    type: Type;
    name: string;
    phone?: string;
}

export class Group {
    id: string;
    users: User[];
}

export class Message {
    id: string;
    content: string;
    author: User;
    group: Group;
}

export abstract class IQuery {
    abstract messages(getMessagesInput?: GetMessagesInput): Message[] | Promise<Message[]>;

    abstract user(id: string): User | Promise<User>;

    abstract group(id: string): Group | Promise<Group>;
}

export abstract class IMutation {
    abstract createGroup(users: string[]): Group | Promise<Group>;

    abstract addUsersToGroup(id: string, users: string[]): Group | Promise<Group>;

    abstract addMessage(addMessageInput?: AddMessageInput): Message | Promise<Message>;
}

export abstract class ISubscription {
    abstract message(groupId: string): Message | Promise<Message>;
}
