import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class SupportService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {        await this.seedData();
    }

    private async seedData() {
        const chatCount = await this.prisma.supportChat.count();
        if (chatCount === 0) {
            const chat1 = await this.prisma.supportChat.create({
                data: {
                    userName: 'Nguyễn Văn A',
                    lastMsg: 'Cảm ơn bác sĩ!',
                    unread: 0,
                    status: 'online',
                },
            });

            await this.prisma.supportChat.createMany({
                data: [
                    { userName: 'Trần Thị B', lastMsg: 'Cho tôi hỏi lịch khám...', unread: 2, status: 'offline' },
                    { userName: 'Lê Văn C', lastMsg: 'Thuốc này uống sao ạ?', unread: 0, status: 'online' },
                ],
            });

            await this.prisma.supportMessage.createMany({
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
        return this.prisma.supportChat.findMany({
            orderBy: { updatedAt: 'desc' },
        });
    }

    async getChatMessages(chatId: number) {
        return this.prisma.supportMessage.findMany({
            where: { chatId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async sendSupportMessage(chatId: number, sender: string, content: string) {
        const msg = await this.prisma.supportMessage.create({
            data: { chatId, sender, content },
        });
        await this.prisma.supportChat.update({
            where: { id: chatId },
            data: { lastMsg: content, updatedAt: new Date() },
        });
        return msg;
    }
}
