import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class LiveService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {        await this.seedData();
    }

    private async seedData() {
        const streamCount = await this.prisma.livestream.count();
        if (streamCount === 0) {
            await this.prisma.livestream.create({
                data: {
                    title: 'Hội thảo: Cập nhật điều trị Đái tháo đường 2024',
                    description: 'Chương trình đào tạo y khoa liên tục...',
                    streamKey: 'live_key_' + Math.random().toString(36).substring(7),
                    serverUrl: 'rtmp://live.medihub.com/app',
                    isStreaming: false,
                },
            });
        }

        const chatCount = await this.prisma.liveChatMessage.count();
        if (chatCount === 0) {
            await this.prisma.liveChatMessage.createMany({
                data: [
                    { livestreamId: 1, userName: 'Dr. Hai', content: 'Chào mọi người!', userRole: 'Doctor' },
                    { livestreamId: 1, userName: 'Pharma Tien', content: 'Âm thanh rất rõ ạ.', userRole: 'Pharmacist' },
                ],
            });
        }
    }

    async getLiveConfig() {
        return this.prisma.livestream.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
    }

    async updateLiveConfig(id: number, data: any) {
        return this.prisma.livestream.update({
            where: { id },
            data,
        });
    }

    async getLiveMessages(livestreamId: number) {
        return this.prisma.liveChatMessage.findMany({
            where: { livestreamId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async sendLiveMessage(data: any) {
        return this.prisma.liveChatMessage.create({
            data,
        });
    }
}
