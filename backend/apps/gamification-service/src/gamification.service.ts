import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GamificationService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedData();
    }

    private async seedData() {
        const badgeCount = await this.badge.count();
        if (badgeCount === 0) {
            await this.badge.createMany({
                data: [
                    { name: 'Early Bird', description: 'Đăng nhập sớm 7 ngày liên tiếp', icon: '🌅', awarded: 234 },
                    { name: 'Health Champion', description: 'Hoàn thành 30 nhiệm vụ sức khỏe', icon: '🏆', awarded: 156 },
                    { name: 'Social Butterfly', description: 'Chia sẻ 10 bài viết', icon: '🦋', awarded: 189 },
                ],
            });
        }

        const ruleCount = await this.pointRule.count();
        if (ruleCount === 0) {
            await this.pointRule.createMany({
                data: [
                    { action: 'Đăng nhập hàng ngày', points: 10 },
                    { action: 'Hoàn thành khóa học', points: 100 },
                    { action: 'Chia sẻ bài viết', points: 20 },
                ],
            });
        }

        const userPointCount = await this.userPoint.count();
        if (userPointCount === 0) {
            await this.userPoint.createMany({
                data: [
                    { userId: 1, userName: 'Nguyễn Văn A', points: 12500, badges: 15, level: 'Platinum' },
                    { userId: 2, userName: 'Trần Thị B', points: 11200, badges: 12, level: 'Gold' },
                    { userId: 3, userName: 'Lê Văn C', points: 9800, badges: 10, level: 'Gold' },
                ],
            });
        }
    }

    async getLeaderboard() {
        return this.userPoint.findMany({
            orderBy: { points: 'desc' },
            take: 20,
        });
    }

    async getBadges() {
        return this.badge.findMany();
    }

    async getPointRules() {
        return this.pointRule.findMany();
    }

    async createBadge(data: any) {
        return this.badge.create({ data });
    }

    async updatePointRule(id: number, points: number) {
        return this.pointRule.update({
            where: { id },
            data: { points },
        });
    }

    async getGamificationStats() {
        const totalPoints = await this.userPoint.aggregate({ _sum: { points: true } });
        const totalPlayers = await this.userPoint.count();
        const totalBadges = await this.badge.count();
        const totalRules = await this.pointRule.count();
        return {
            totalPoints: totalPoints._sum.points || 0,
            totalPlayers,
            totalBadges,
            totalRules,
        };
    }
}
