import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Injectable()
export class ContentService {
    constructor(private prisma: PrismaService) { }

    // Posts
    async getPosts() {
        return this.prisma.post.findMany({ include: { Category: true }, orderBy: { createdAt: 'desc' } });
    }

    async getPost(id: number) {
        return this.prisma.post.findUnique({ where: { id }, include: { Category: true, comments: true } });
    }

    async createPost(data: any) {
        return this.prisma.post.create({ data });
    }

    async updatePost(id: number, data: any) {
        return this.prisma.post.update({ where: { id }, data });
    }

    async deletePost(id: number) {
        return this.prisma.post.delete({ where: { id } });
    }

    // Categories
    async getCategories() {
        return this.prisma.category.findMany();
    }

    async createCategory(data: { name: string }) {
        return this.prisma.category.create({ data });
    }

    async deleteCategory(id: number) {
        return this.prisma.category.delete({ where: { id } });
    }

    // Banners
    async getBanners() {
        return this.prisma.banner.findMany();
    }

    async createBanner(data: any) {
        return this.prisma.banner.create({ data });
    }

    async deleteBanner(id: number) {
        return this.prisma.banner.delete({ where: { id } });
    }

    // Videos
    async getVideos() {
        return this.prisma.video.findMany();
    }

    async createVideo(data: any) {
        return this.prisma.video.create({ data });
    }

    async deleteVideo(id: number) {
        return this.prisma.video.delete({ where: { id } });
    }

    // Static Pages
    async getStaticPages() {
        return this.prisma.staticPage.findMany();
    }

    async getStaticPageBySlug(slug: string) {
        return this.prisma.staticPage.findUnique({ where: { slug } });
    }

    async createStaticPage(data: any) {
        return this.prisma.staticPage.create({ data });
    }

    async updateStaticPage(id: number, data: any) {
        return this.prisma.staticPage.update({ where: { id }, data });
    }

    async deleteStaticPage(id: number) {
        return this.prisma.staticPage.delete({ where: { id } });
    }

    // Questions & Answers
    async getQuestions() {
        return this.prisma.question.findMany({ include: { answers: true }, orderBy: { createdAt: 'desc' } });
    }

    async createQuestion(data: any) {
        return this.prisma.question.create({ data });
    }

    async deleteQuestion(id: number) {
        return this.prisma.question.delete({ where: { id } });
    }

    async addAnswer(questionId: number, data: any) {
        return this.prisma.answer.create({
            data: {
                ...data,
                Question: { connect: { id: questionId } },
            },
        });
    }

    // Topics
    async getTopics() {
        return this.prisma.topic.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createTopic(data: any) {
        return this.prisma.topic.create({ data });
    }

    async deleteTopic(id: number) {
        return this.prisma.topic.delete({ where: { id } });
    }

    // Comments
    async getAllComments() {
        return this.prisma.comment.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getComments(targetId: string, targetType: string) {
        return this.prisma.comment.findMany({
            where: { targetId, targetType },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createComment(data: any) {
        return this.prisma.comment.create({ data });
    }

    async deleteComment(id: number) {
        return this.prisma.comment.delete({ where: { id } });
    }

    // Top Search
    async getTopSearches() {
        return this.prisma.topSearch.findMany({ orderBy: { count: 'desc' }, take: 20 });
    }

    async recordSearch(keyword: string) {
        return this.prisma.topSearch.upsert({
            where: { keyword },
            update: { count: { increment: 1 } },
            create: { keyword, count: 1 },
        });
    }
}
