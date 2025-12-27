import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, CommentStatus } from '@prisma/client';

@Injectable()
export class EngagementService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedData();
    }

    private async seedData() {
        const commentCount = await this.comment.count();
        if (commentCount === 0) {
            await this.comment.createMany({
                data: [
                    { userName: 'Nguyen Van A', content: 'Bài viết rất hay, cảm ơn bác sĩ.', postTitle: 'Cập nhật điều trị...', status: 'PENDING' },
                    { userName: 'Tran Thi B', content: 'Quảng cáo bán thuốc trá hình...', postTitle: 'Dinh dưỡng cho bé', status: 'SPAM' },
                    { userName: 'Le Van C', content: 'Cho mình xin tài liệu với ạ.', postTitle: 'Hội thảo Tim mạch', status: 'APPROVED' },
                ],
            });
        }
    }

    async getComments() {
        return this.comment.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateCommentStatus(id: number, status: CommentStatus) {
        return this.comment.update({
            where: { id },
            data: { status },
        });
    }

    async getCommentStats() {
        const pending = await this.comment.count({ where: { status: 'PENDING' } });
        const spam = await this.comment.count({ where: { status: 'SPAM' } });
        const total = await this.comment.count();
        return { pending, spam, total };
    }
}
