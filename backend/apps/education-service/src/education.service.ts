import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/education';

@Injectable()
export class EducationService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // Course CRUD
    async getCourses() {
        return this.course.findMany({ include: { lecturer: true } });
    }

    async getCourse(id: string) {
        return this.course.findUnique({ where: { id }, include: { lecturer: true, lessons: true, quizzes: true } });
    }

    async createCourse(data: any) {
        return this.course.create({ data });
    }

    async updateCourse(id: string, data: any) {
        return this.course.update({ where: { id }, data });
    }

    async deleteCourse(id: string) {
        return this.course.delete({ where: { id } });
    }

    // Lecturer CRUD
    async getLecturers() {
        return this.lecturer.findMany();
    }

    async createLecturer(data: any) {
        return this.lecturer.create({ data });
    }

    // Enrollment logic
    async getEnrollments(userId?: string) {
        return this.enrollment.findMany({
            where: userId ? { userId } : {},
            include: { course: true }
        });
    }

    async enrollUser(userId: string, courseId: string) {
        return this.enrollment.create({
            data: { userId, courseId }
        });
    }

    // Quiz logic
    async getQuizzes(courseId: string) {
        return this.quiz.findMany({
            where: { courseId },
            include: { questions: true }
        });
    }
}
