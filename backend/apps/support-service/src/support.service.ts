import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SupportService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedData();
    }

    private async seedData() {
        const chatCount = await this.supportChat.count();
        if (chatCount === 0) {
            const chat1 = await this.supportChat.create({
                data: {
                    userName: 'Nguyễn Văn A',
                    lastMsg: 'Cảm ơn bác sĩ!',
                    unread: 0,
                    status: 'online',
                },
            });

            await this.supportChat.createMany({
                data: [
                    { userName: 'Trần Thị B', lastMsg: 'Cho tôi hỏi lịch khám...', unread: 2, status: 'offline' },
                    { userName: 'Lê Văn C', lastMsg: 'Thuốc này uống sao ạ?', unread: 0, status: 'online' },
                ],
            });

            await this.supportMessage.createMany({
                data: [
                    { chatId: chat1.id, sender: 'user', content: 'Chào bác sĩ, tôi muốn hỏi về gói khám tổng quát.' },
                    { chatId: chat1.id, sender: 'admin', content: 'Chào bạn, gói khám tổng quát bao gồm xét nghiệm máu, siêu âm và khám nội.' },
                    { chatId: chat1.id, sender: 'user', content: 'Giá bao nhiêu vậy ạ?' },
                    { chatId: chat1.id, sender: 'admin', content: 'Giá gói cơ bản là 2.500.000đ ạ.' },
                    { chatId: chat1.id, sender: 'user', content: 'Cảm ơn bác sĩ!' },
                ],
            });
        }
    }

    async getSupportChats() {
        return this.supportChat.findMany({
            orderBy: { updatedAt: 'desc' },
        });
    }

    async getChatMessages(chatId: number) {
        return this.supportMessage.findMany({
            where: { chatId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async sendSupportMessage(chatId: number, sender: string, content: string) {
        const msg = await this.supportMessage.create({
            data: { chatId, sender, content },
        });
        await this.supportChat.update({
            where: { id: chatId },
            data: { lastMsg: content, updatedAt: new Date() },
        });
        return msg;
    }
}
