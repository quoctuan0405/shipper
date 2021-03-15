import { Message, Group, User } from '.prisma/client';
import {Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AddMessageDto } from './dto/add-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MessageService } from './message.service';

const pubsub = new PubSub();

enum Channel {
    MESSAGE_GROUP = 'messageGroup'
}

@Resolver('Message')
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Query('messages')
    async getMessages(@Args('getMessagesInput') args: GetMessagesDto): Promise<Message[]> {
        return await this.messageService.messages(args.groupId, args.cursor);
    }

    @ResolveField('author')
    async getAuthor(@Parent() message: Message): Promise<User> {
        return await this.messageService.getUserById(message.authorId);
    }

    @ResolveField('group')
    async getGroup(@Parent() message: Message): Promise<Group> {
        return await this.messageService.getGroupById(message.groupId);
    }

    @Mutation('addMessage')
    async addMessage(@Args('addMessageInput') args: AddMessageDto) {
        const message = await this.messageService.addMessage(args);

        pubsub.publish(`${Channel.MESSAGE_GROUP} ${args.groupId}`, {message});

        return message;
    }

    @Subscription('message')
    async messageSubscription(@Args('groupId') groupId: string) {
        return pubsub.asyncIterator(`${Channel.MESSAGE_GROUP} ${groupId}`);
    }
}