import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AIService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedData();
    }

    private async seedData() {
        const recCount = await this.recommendation.count();
        if (recCount === 0) {
            await this.recommendation.createMany({
                data: [
                    {
                        patientName: 'Nguyễn Văn A',
                        symptoms: 'Đau ngực, khó thở',
                        recommendedItem: 'BS. Trần Tim Mạch',
                        confidence: 0.95,
                        reason: 'Chuyên khoa phù hợp, kinh nghiệm 15 năm',
                        type: 'DOCTOR',
                    },
                    {
                        patientName: 'Trần Thị B',
                        symptoms: 'Sốt cao, ho',
                        recommendedItem: 'BS. Lê Nhi Khoa',
                        confidence: 0.88,
                        reason: 'Triệu chứng phù hợp với chuyên môn',
                        type: 'DOCTOR',
                    },
                    {
                        patientName: 'Lê Văn C',
                        symptoms: 'Đau dạ dày, buồn nôn',
                        recommendedItem: 'Viêm dạ dày cấp',
                        confidence: 0.82,
                        reason: 'Dựa trên tiền sử ăn uống và vị trí đau',
                        type: 'DIAGNOSIS',
                    },
                    {
                        patientName: 'Phạm Thị D',
                        symptoms: 'Dị ứng, mề đay',
                        recommendedItem: 'Loratadine 10mg',
                        confidence: 0.91,
                        reason: 'Kháng histamine thế hệ mới, ít tác dụng phụ',
                        type: 'MEDICATION',
                    },
                ],
            });
        }

        const statsCount = await this.aIStats.count();
        if (statsCount === 0) {
            await this.aIStats.create({
                data: {
                    accuracy: 0.92,
                    dailySuggestions: 1234,
                    acceptanceRate: 0.85,
                    modelVersion: 'v2.5',
                },
            });
        }

        const performanceCount = await this.modelPerformance.count();
        if (performanceCount === 0) {
            await this.modelPerformance.create({
                data: {
                    precision: 0.91,
                    recall: 0.89,
                    f1Score: 0.90,
                },
            });
        }
    }

    async getRecommendations(type?: string) {
        const where = type ? { type: type.toUpperCase() as any } : {};
        return this.recommendation.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async handleFeedback(id: number, status: string) {
        return this.recommendation.update({
            where: { id },
            data: { status: status.toUpperCase() as any },
        });
    }

    async getAIStats() {
        return this.aIStats.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
    }

    async getModelPerformance() {
        return this.modelPerformance.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
    }
}
