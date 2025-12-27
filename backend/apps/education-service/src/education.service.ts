import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class EducationService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {    }

    // Course CRUD
    async getCourses() {
        return this.prisma.course.findMany({ include: { lecturer: true } });
    }

    async getCourse(id: string) {
        return this.prisma.course.findUnique({ where: { id }, include: { lecturer: true, lessons: true, quizzes: true } });
    }

    async createCourse(data: any) {
        return this.prisma.course.create({ data });
    }

    async updateCourse(id: string, data: any) {
        return this.prisma.course.update({ where: { id }, data });
    }

    async deleteCourse(id: string) {
        return this.prisma.course.delete({ where: { id } });
    }

    // Lecturer CRUD
    async getLecturers() {
        return this.prisma.lecturer.findMany();
    }

    async createLecturer(data: any) {
        return this.prisma.lecturer.create({ data });
    }

    // Enrollment logic
    async getEnrollments(userId?: string) {
        return this.prisma.enrollment.findMany({
            where: userId ? { userId } : {},
            include: { course: true }
        });
    }

    async enrollUser(userId: string, courseId: string) {
        return this.prisma.enrollment.create({
            data: { userId, courseId }
        });
    }

    // Quiz logic
    async getQuizzes(courseId: string) {
        return this.prisma.quiz.findMany({
            where: { courseId },
            include: { questions: true }
        });
    }
}
