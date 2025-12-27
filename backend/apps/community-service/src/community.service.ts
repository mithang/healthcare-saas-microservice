import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/community';

@Injectable()
export class CommunityService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // --- Forum ---
    async getForumTopics() {
        return this.forumTopic.findMany({
            include: { _count: { select: { replies: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getForumTopic(id: number) {
        return this.forumTopic.findUnique({
            where: { id },
            include: { replies: true }
        });
    }

    async createForumTopic(data: any) {
        return this.forumTopic.create({ data });
    }

    async updateForumTopic(id: number, data: any) {
        return this.forumTopic.update({ where: { id }, data });
    }

    async deleteForumTopic(id: number) {
        return this.forumTopic.delete({ where: { id } });
    }

    // --- QA ---
    async getQAQuestions() {
        return this.qAQuestion.findMany({
            include: { _count: { select: { answers: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getQAQuestion(id: number) {
        return this.qAQuestion.findUnique({
            where: { id },
            include: { answers: true }
        });
    }

    async createQAQuestion(data: any) {
        return this.qAQuestion.create({ data });
    }

    async updateQAQuestion(id: number, data: any) {
        return this.qAQuestion.update({ where: { id }, data });
    }

    async deleteQAQuestion(id: number) {
        return this.qAQuestion.delete({ where: { id } });
    }

    // --- Support Groups ---
    async getSupportGroups() {
        return this.supportGroup.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getSupportGroup(id: number) {
        return this.supportGroup.findUnique({ where: { id } });
    }

    async createSupportGroup(data: any) {
        return this.supportGroup.create({ data });
    }

    async updateSupportGroup(id: number, data: any) {
        return this.supportGroup.update({ where: { id }, data });
    }

    async deleteSupportGroup(id: number) {
        return this.supportGroup.delete({ where: { id } });
    }

    // --- Moderation ---
    async getModerationReports() {
        return this.moderationReport.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createModerationReport(data: any) {
        return this.moderationReport.create({ data });
    }

    async updateModerationReport(id: number, data: any) {
        return this.moderationReport.update({ where: { id }, data });
    }

    async deleteModerationReport(id: number) {
        return this.moderationReport.delete({ where: { id } });
    }
}
