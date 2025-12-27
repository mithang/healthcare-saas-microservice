import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LiveService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedData();
    }

    private async seedData() {
        const streamCount = await this.livestream.count();
        if (streamCount === 0) {
            await this.livestream.create({
                data: {
                    title: 'Hội thảo: Cập nhật điều trị Đái tháo đường 2024',
                    description: 'Chương trình đào tạo y khoa liên tục...',
                    streamKey: 'live_key_' + Math.random().toString(36).substring(7),
                    serverUrl: 'rtmp://live.medihub.com/app',
                    isStreaming: false,
                },
            });
        }

        const chatCount = await this.liveChatMessage.count();
        if (chatCount === 0) {
            await this.liveChatMessage.createMany({
                data: [
                    { livestreamId: 1, userName: 'Dr. Hai', content: 'Chào mọi người!', userRole: 'Doctor' },
                    { livestreamId: 1, userName: 'Pharma Tien', content: 'Âm thanh rất rõ ạ.', userRole: 'Pharmacist' },
                ],
            });
        }
    }

    async getLiveConfig() {
        return this.livestream.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
    }

    async updateLiveConfig(id: number, data: any) {
        return this.livestream.update({
            where: { id },
            data,
        });
    }

    async getLiveMessages(livestreamId: number) {
        return this.liveChatMessage.findMany({
            where: { livestreamId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async sendLiveMessage(data: any) {
        return this.liveChatMessage.create({
            data,
        });
    }
}
