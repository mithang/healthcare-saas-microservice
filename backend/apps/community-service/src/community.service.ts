import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class CommunityService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {    }

    // --- Forum ---
    async getForumTopics() {
        return this.prisma.forumTopic.findMany({
            include: { _count: { select: { replies: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getForumTopic(id: number) {
        return this.prisma.forumTopic.findUnique({
            where: { id },
            include: { replies: true }
        });
    }

    async createForumTopic(data: any) {
        return this.prisma.forumTopic.create({ data });
    }

    async updateForumTopic(id: number, data: any) {
        return this.prisma.forumTopic.update({ where: { id }, data });
    }

    async deleteForumTopic(id: number) {
        return this.prisma.forumTopic.delete({ where: { id } });
    }

    // --- QA ---
    async getQAQuestions() {
        return this.prisma.qAQuestion.findMany({
            include: { _count: { select: { answers: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getQAQuestion(id: number) {
        return this.prisma.qAQuestion.findUnique({
            where: { id },
            include: { answers: true }
        });
    }

    async createQAQuestion(data: any) {
        return this.prisma.qAQuestion.create({ data });
    }

    async updateQAQuestion(id: number, data: any) {
        return this.prisma.qAQuestion.update({ where: { id }, data });
    }

    async deleteQAQuestion(id: number) {
        return this.prisma.qAQuestion.delete({ where: { id } });
    }

    // --- Support Groups ---
    async getSupportGroups() {
        return this.prisma.supportGroup.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getSupportGroup(id: number) {
        return this.prisma.supportGroup.findUnique({ where: { id } });
    }

    async createSupportGroup(data: any) {
        return this.prisma.supportGroup.create({ data });
    }

    async updateSupportGroup(id: number, data: any) {
        return this.prisma.supportGroup.update({ where: { id }, data });
    }

    async deleteSupportGroup(id: number) {
        return this.prisma.supportGroup.delete({ where: { id } });
    }

    // --- Moderation ---
    async getModerationReports() {
        return this.prisma.moderationReport.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createModerationReport(data: any) {
        return this.prisma.moderationReport.create({ data });
    }

    async updateModerationReport(id: number, data: any) {
        return this.prisma.moderationReport.update({ where: { id }, data });
    }

    async deleteModerationReport(id: number) {
        return this.prisma.moderationReport.delete({ where: { id } });
    }
}
