import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class SurveyService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {    }

    async getSurveys() {
        return this.prisma.survey.findMany({
            include: {
                _count: {
                    select: { responses: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getSurveyById(id: number) {
        return this.prisma.survey.findUnique({
            where: { id },
            include: {
                questions: {
                    orderBy: { order: 'asc' }
                },
                _count: {
                    select: { responses: true }
                }
            }
        });
    }

    async createSurvey(data: any) {
        const { title, description, status, questions } = data;
        return this.prisma.survey.create({
            data: {
                title,
                description,
                status: status || 'DRAFT',
                questions: {
                    create: questions?.map((q: any, index: number) => ({
                        text: q.text,
                        type: q.type,
                        options: q.options,
                        required: q.required,
                        order: index
                    }))
                }
            },
            include: { questions: true }
        });
    }

    async updateSurvey(id: number, data: any) {
        const { title, description, status, questions } = data;

        // Simple update for survey metadata
        const survey = await this.prisma.survey.update({
            where: { id },
            data: { title, description, status }
        });

        // If questions are provided, we might want to sync them (delete/re-create or update)
        // For simplicity in this initial version, if questions are provided, we'll replace them
        if (questions) {
            await this.prisma.question.deleteMany({ where: { surveyId: id } });
            await this.prisma.question.createMany({
                data: questions.map((q: any, index: number) => ({
                    surveyId: id,
                    text: q.text,
                    type: q.type,
                    options: q.options,
                    required: q.required,
                    order: index
                }))
            });
        }

        return this.getSurveyById(id);
    }

    async deleteSurvey(id: number) {
        // Delete questions and responses first due to constraints
        await this.prisma.question.deleteMany({ where: { surveyId: id } });
        await this.prisma.response.deleteMany({ where: { surveyId: id } });
        return this.prisma.survey.delete({ where: { id } });
    }

    async submitResponse(data: any) {
        const { surveyId, userId, answers } = data;
        return this.prisma.response.create({
            data: {
                surveyId,
                userId,
                answers
            }
        });
    }

    async getResponses(surveyId: number) {
        return this.prisma.response.findMany({
            where: { surveyId },
            orderBy: { createdAt: 'desc' }
        });
    }
}
