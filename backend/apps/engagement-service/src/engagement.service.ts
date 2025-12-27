import { PrismaService } from './prisma';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, CommentStatus } from '.prisma/client-engagement-service';

@Injectable()
export class EngagementService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {        await this.seedData();
    }

    private async seedData() {
        const commentCount = await this.prisma.comment.count();
        if (commentCount === 0) {
            await this.prisma.comment.createMany({
                data: [
                    { userName: 'Nguyen Van A', content: 'Bài viết rất hay, cảm ơn bác sĩ.', postTitle: 'Cập nhật điều trị...', status: 'PENDING' },
                    { userName: 'Tran Thi B', content: 'Quảng cáo bán thuốc trá hình...', postTitle: 'Dinh dưỡng cho bé', status: 'SPAM' },
                    { userName: 'Le Van C', content: 'Cho mình xin tài liệu với ạ.', postTitle: 'Hội thảo Tim mạch', status: 'APPROVED' },
                ],
            });
        }
    }

    async getComments() {
        return this.prisma.comment.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateCommentStatus(id: number, status: CommentStatus) {
        return this.prisma.comment.update({
            where: { id },
            data: { status },
        });
    }

    async getCommentStats() {
        const pending = await this.prisma.comment.count({ where: { status: 'PENDING' } });
        const spam = await this.prisma.comment.count({ where: { status: 'SPAM' } });
        const total = await this.prisma.comment.count();
        return { pending, spam, total };
    }
}
