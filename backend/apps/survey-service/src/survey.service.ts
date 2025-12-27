import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SurveyService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async getSurveys() {
        return this.survey.findMany({
            include: {
                _count: {
                    select: { responses: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getSurveyById(id: number) {
        return this.survey.findUnique({
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
        return this.survey.create({
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
        const survey = await this.survey.update({
            where: { id },
            data: { title, description, status }
        });

        // If questions are provided, we might want to sync them (delete/re-create or update)
        // For simplicity in this initial version, if questions are provided, we'll replace them
        if (questions) {
            await this.question.deleteMany({ where: { surveyId: id } });
            await this.question.createMany({
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
        await this.question.deleteMany({ where: { surveyId: id } });
        await this.response.deleteMany({ where: { surveyId: id } });
        return this.survey.delete({ where: { id } });
    }

    async submitResponse(data: any) {
        const { surveyId, userId, answers } = data;
        return this.response.create({
            data: {
                surveyId,
                userId,
                answers
            }
        });
    }

    async getResponses(surveyId: number) {
        return this.response.findMany({
            where: { surveyId },
            orderBy: { createdAt: 'desc' }
        });
    }
}
